import type * as P from "@tsplus/stdlib/prelude/AssociativeBoth"

/**
 * @tsplus static Maybe/Ops AssociativeBoth
 */
export const AssociativeBoth = HKT.instance<P.AssociativeBoth<Maybe.HKT>>({
  both: Maybe.$.zip
})
