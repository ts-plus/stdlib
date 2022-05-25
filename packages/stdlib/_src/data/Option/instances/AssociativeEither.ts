import type * as P from "@tsplus/stdlib/prelude/AssociativeEither"

/**
 * @tsplus static Option/Ops AssociativeEither
 */
export const AssociativeEither = HKT.instance<P.AssociativeEither<Option.HKT>>({
  orElseEither: <B>(fb: LazyArg<Option<B>>) =>
    <A>(fa: Option<A>): Option<Either<A, B>> =>
      fa._tag === "Some" ? Option.some(Either.left(fa.value)) : fb().map(Either.right)
})
