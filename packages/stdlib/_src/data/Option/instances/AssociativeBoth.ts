import type * as P from "@tsplus/stdlib/prelude/AssociativeBoth";

/**
 * @tsplus static Option/Ops AssociativeBoth
 */
export const AssociativeBoth = HKT.instance<P.AssociativeBoth<Option.HKT>>({
  both: Option.$.zip
});
