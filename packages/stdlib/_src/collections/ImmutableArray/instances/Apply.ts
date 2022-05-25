import type * as P from "@tsplus/stdlib/prelude/Apply"

/**
 * @tsplus static ImmutableArray/Ops Apply
 */
export const Apply = HKT.instance<P.Apply<ImmutableArray.HKT>>({
  ...ImmutableArray.Covariant,
  ...ImmutableArray.AssociativeBoth
})
