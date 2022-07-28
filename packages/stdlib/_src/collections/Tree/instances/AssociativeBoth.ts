import type * as P from "@tsplus/stdlib/prelude/AssociativeBoth"

/**
 * @tsplus static Tree.Ops AssociativeBoth
 */
export const AssociativeBoth = HKT.instance<P.AssociativeBoth<Tree.HKT>>({
  both: Tree.$.zip
})
