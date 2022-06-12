import type * as P from "@tsplus/stdlib/prelude/AssociativeFlatten"

/**
 * @tsplus static Option/Ops AssociativeFlatten
 */
export const AssociativeFlatten = HKT.instance<P.AssociativeFlatten<Option.HKT>>({
  flatten: (option) => option.flatten
})
