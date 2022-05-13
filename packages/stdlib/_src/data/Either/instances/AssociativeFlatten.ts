import type * as P from "@tsplus/stdlib/prelude/AssociativeFlatten";

/**
 * @tsplus static Either/Ops AssociativeFlatten
 */
export const AssociativeFlatten = HKT.instance<P.AssociativeFlatten<Either.HKT>>({
  flatten: (ffa) => ffa.flatten()
});
