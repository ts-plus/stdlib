import type * as P from "@tsplus/stdlib/prelude/AssociativeEither"

/**
 * @tsplus static Maybe/Ops AssociativeEither
 */
export const AssociativeEither = HKT.instance<P.AssociativeEither<Maybe.HKT>>({
  orElseEither: <B>(fb: LazyArg<Maybe<B>>) =>
    <A>(fa: Maybe<A>): Maybe<Either<A, B>> =>
      fa._tag === "Some" ? Maybe.some(Either.left(fa.value)) : fb().map(Either.right)
})
