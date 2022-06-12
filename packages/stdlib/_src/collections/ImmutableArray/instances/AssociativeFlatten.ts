import type * as P from "@tsplus/stdlib/prelude/AssociativeFlatten"

/**
 * @tsplus static ImmutableArray/Ops AssociativeFlatten
 */
export const AssociativeFlatten = HKT.instance<P.AssociativeFlatten<ImmutableArray.HKT>>({
  flatten: (ffa) => ffa.flatten
})
