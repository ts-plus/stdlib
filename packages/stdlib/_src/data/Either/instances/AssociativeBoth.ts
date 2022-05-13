import type * as P from "@tsplus/stdlib/prelude/AssociativeBoth";

/**
 * @tsplus static Either/Ops AssociativeBoth
 */
export const AssociativeBoth = HKT.instance<P.AssociativeBoth<Either.HKT>>({
  both: Either.$.zip
});
