import type * as P from "@tsplus/stdlib/prelude/AssociativeBoth"

/**
 * @tsplus static ImmutableArray.Ops AssociativeBoth
 */
export const AssociativeBoth = HKT.instance<P.AssociativeBoth<ImmutableArray.HKT>>({
  both: ImmutableArray.$.zip
})
