export class GenEval<A> {
  readonly _A!: () => A

  constructor(readonly io: Eval<A>) {}

  *[Symbol.iterator](): Generator<GenEval<A>, A, any> {
    return yield this
  }
}

function adapter<A>(_: Eval<A>): GenEval<A> {
  return new GenEval(_)
}

function run_<Eff extends GenEval<any>, AEff>(
  state: IteratorYieldResult<Eff> | IteratorReturnResult<AEff>,
  iterator: Generator<Eff, AEff, any>
): Eval<AEff> {
  if (state.done) {
    return Eval.succeed(state.value)
  }
  return state.value["io"].flatMap((val) => {
    const next = iterator.next(val)
    return run_(next, iterator)
  })
}

/**
 * Generator
 *
 * @tsplus static Eval.Ops gen
 */
export function gen<Eff extends GenEval<any>, AEff>(
  f: (i: { <A>(_: Eval<A>): GenEval<A> }) => Generator<Eff, AEff, any>
): Eval<AEff> {
  return Eval.suspend(() => {
    const iterator = f(adapter)
    const state = iterator.next()
    return run_(state, iterator)
  })
}
