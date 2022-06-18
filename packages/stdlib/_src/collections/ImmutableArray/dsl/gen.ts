import { GenLazyHKT } from "@tsplus/stdlib/prelude/DSL/genF"

const adapter: {
  <A>(_: LazyArg<Maybe<A>>): GenLazyHKT<ImmutableArray<A>, A>
  <A>(_: LazyArg<ImmutableArray<A>>): GenLazyHKT<ImmutableArray<A>, A>
} = (_: () => any) =>
  new GenLazyHKT(() => {
    const x = _()
    if (Maybe.isMaybe(x)) {
      return x._tag === "None" ? ImmutableArray.empty() : ImmutableArray(x.value)
    }
    return x
  })

/**
 * @tsplus static ImmutableArray/Ops gen
 */
export const gen = DSL.genWithHistoryF(ImmutableArray.Monad, {
  adapter
})
