import type * as P from "@tsplus/stdlib/prelude/AssociativeFlatten"

/**
 * @tsplus static Maybe/Ops AssociativeFlatten
 */
export const AssociativeFlatten = HKT.instance<P.AssociativeFlatten<Maybe.HKT>>({
  flatten: (maybe) => maybe.flatten
})
