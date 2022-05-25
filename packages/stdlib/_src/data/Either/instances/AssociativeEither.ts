import type * as P from "@tsplus/stdlib/prelude/AssociativeEither"

/**
 * @tsplus static Either/Ops AssociativeEither
 */
export const AssociativeEither = HKT.instance<P.AssociativeEither<Either.HKT>>({
  orElseEither: (fb) => (fa) => fa._tag === "Right" ? Either.right(Either.left(fa.right)) : fb().map(Either.right)
})
