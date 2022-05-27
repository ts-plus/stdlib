/**
 * @tsplus type Monad
 */
export type Monad<F extends HKT> = IdentityFlatten<F> & Covariant<F>

/**
 * @tsplus fluent Monad getApplicative
 */
export function getApplicative<F extends HKT>(F: Monad<F>): Applicative<F> {
  return HKT.instance({
    ...F.getApply(),
    any: F.any
  })
}

/**
 * @tsplus fluent Monad getApply
 */
export function getApply<F extends HKT>(F: Monad<F>): Apply<F> {
  return HKT.instance({
    map: F.map,
    both: <R, E, A, R2, E2, B>(
      fa: HKT.Kind<F, R, E, A>,
      fb: HKT.Kind<F, R2, E2, B>
    ): HKT.Kind<F, R2 & R, E2 | E, Tuple<[A, B]>> => F.flatMap(fb, (b) => F.map(fa, (a: A) => Tuple(a, b)))
  })
}

/**
 * @tsplus fluent Monad flatMap
 */
export function flatMap<F extends HKT, R, E, A, R2, E2, B>(
  F: Monad<F>,
  fa: HKT.Kind<F, R, E, A>,
  f: (a: A) => HKT.Kind<F, R2, E2, B>
): HKT.Kind<F, R & R2, E | E2, B> {
  return F.flatten(F.map(fa, f))
}

export class GenHKT<T, A> {
  constructor(readonly effect: T) {}

  *[Symbol.iterator](): Generator<GenHKT<T, A>, A, any> {
    return yield this
  }
}

export class GenLazyHKT<T, A> {
  constructor(readonly effect: () => T) {}

  *[Symbol.iterator](): Generator<GenLazyHKT<T, A>, A, any> {
    return yield this
  }
}

const adapter = (_: any) => {
  return new GenHKT(_)
}

const adapterLazy = (_: () => any) => {
  return new GenHKT(_)
}

/**
 * To be used with multi-shot monads, required adapter to be lazy and is O(n^2)
 * perf wise because the generator needs to be replayed.
 *
 * @tsplus fluent Monad genWithHistory
 */
export function genWithHistory<
  F extends HKT,
  ADAPTER = {
    <R, E, A>(_: LazyArg<HKT.Kind<F, R, E, A>>): GenLazyHKT<HKT.Kind<F, R, E, A>, A>
  }
>(F: Monad<F>, config?: { adapter?: ADAPTER }) {
  return <Eff extends GenLazyHKT<HKT.Kind<F, any, any, any>, any>, AEff>(
    f: (i: ADAPTER) => Generator<Eff, AEff, any>
  ): HKT.Kind<
    F,
    HKT.Infer<F, "R", ReturnType<Eff["effect"]>>,
    HKT.Infer<F, "E", ReturnType<Eff["effect"]>>,
    AEff
  > => {
    return F.flatMap(F.succeed({}), () => {
      function run(replayStack: List<any>): HKT.Kind<
        F,
        HKT.Infer<F, "R", ReturnType<Eff["effect"]>>,
        HKT.Infer<F, "E", ReturnType<Eff["effect"]>>,
        AEff
      > {
        const iterator = f((config?.adapter ? config.adapter : adapterLazy) as any)
        let state = iterator.next()

        for (const a of replayStack.reverse()) {
          if (state.done) {
            throw new PrematureGeneratorExit()
          }
          state = iterator.next(a)
        }

        if (state.done) {
          return F.succeed(state.value)
        }

        return F.flatMap(state.value["effect"](), (val) => {
          return run(replayStack.prepend(val))
        })
      }

      return run(List.empty())
    })
  }
}

/**
 * To be used in one-shot monads, adapter is eager and perf is native.
 *
 * @tsplus fluent Monad gen
 */
export function gen<
  F extends HKT,
  ADAPTER = {
    <R, E, A>(_: HKT.Kind<F, R, E, A>): GenHKT<HKT.Kind<F, R, E, A>, A>
  }
>(
  F: Monad<F>,
  config?: { adapter?: ADAPTER }
) {
  return <Eff extends GenHKT<HKT.Kind<F, any, any, any>, any>, AEff>(
    f: (i: ADAPTER) => Generator<Eff, AEff, any>
  ): HKT.Kind<
    F,
    HKT.Infer<F, "R", Eff["effect"]>,
    HKT.Infer<F, "E", Eff["effect"]>,
    AEff
  > => {
    return F.flatMap(F.succeed({}), () => {
      const iterator = f((config?.adapter ? config.adapter : adapter) as any)
      const state = iterator.next()

      function run(
        state: IteratorYieldResult<Eff> | IteratorReturnResult<AEff>
      ): HKT.Kind<
        F,
        HKT.Infer<F, "R", Eff["effect"]>,
        HKT.Infer<F, "E", Eff["effect"]>,
        AEff
      > {
        if (state.done) {
          return F.succeed(state.value)
        }
        return F.flatMap(state.value["effect"], (val) => {
          const next = iterator.next(val)
          return run(next)
        })
      }

      return run(state)
    })
  }
}

export interface Do<F extends HKT> {
  Do: HKT.Kind<F, unknown, never, {}>
  bind: <N extends string, R, E, A, Scope>(
    name: N extends keyof Scope ? { error: `binding name '${N}' already in use` } : N,
    fn: (_: Scope) => HKT.Kind<F, R, E, A>
  ) => <R0, E0>(
    self: HKT.Kind<F, R0, E0, Scope>
  ) => HKT.Kind<
    F,
    R & R0,
    E | E0,
    {
      readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : A
    }
  >
  bindValue: <N extends string, B, Scope>(
    name: N extends keyof Scope ? { error: `binding name '${N}' already in use` } : N,
    fn: (_: Scope) => B
  ) => <R, E>(
    self: HKT.Kind<F, R, E, Scope>
  ) => HKT.Kind<
    F,
    R,
    E,
    {
      readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : B
    }
  >
}

/**
 * @tsplus fluent Monad getDo
 */
export function getDoF<F extends HKT>(F: Monad<F>): Do<F> {
  return {
    Do: F.succeed({}),
    bind: <N extends string, R, E, A, Scope>(
      name: N extends keyof Scope ? { error: `binding name '${N}' already in use` }
        : N,
      f: (_: Scope) => HKT.Kind<F, R, E, A>
    ) =>
      <R0, E0>(self: HKT.Kind<F, R0, E0, Scope>): HKT.Kind<
        F,
        R & R0,
        E | E0,
        {
          readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : A
        }
      > =>
        F.flatMap(self, (scope) =>
          F.map(f(scope), (a: A) => ({ ...scope, [name as string]: a } as {
            readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k]
              : A
          }))),
    bindValue: <N extends string, B, Scope>(
      name: N extends keyof Scope ? { error: `binding name '${N}' already in use` }
        : N,
      f: (_: Scope) => B
    ) =>
      <R, E>(
        self: HKT.Kind<F, R, E, Scope>
      ): HKT.Kind<
        F,
        R,
        E,
        {
          readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : B
        }
      > =>
        F.map(self, (k: Scope) =>
          Object.assign(
            {},
            k,
            { [name as string]: f(k) } as {
              readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : B
            }
          ))
  }
}
