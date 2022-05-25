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
 * @tsplus static DSL genWithHistoryF
 */
export function genWithHistoryF<
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
    const flatMap_ = DSL.flatMapF_(F)
    const succeed = DSL.succeedF(F)

    return flatMap_(succeed({}), () => {
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
          return succeed(state.value)
        }

        return flatMap_(state.value["effect"](), (val) => {
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
 * @tsplus static DSL genF
 */
export function genF<
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
    const flatMap_ = DSL.flatMapF_(F)
    const succeed = DSL.succeedF(F)

    return flatMap_(succeed({}), () => {
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
          return succeed(state.value)
        }
        return flatMap_(state.value["effect"], (val) => {
          const next = iterator.next(val)
          return run(next)
        })
      }

      return run(state)
    })
  }
}
