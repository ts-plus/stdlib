/**
 * @tsplus static Either/Ops ChainRec
 */
export const EitherChainRec = HKT.instance<ChainRec<Either.HKT>>({
  chainRec: <A, B, E>(f: (a: A) => Either<E, Either<A, B>>) =>
    (a: A): Either<E, B> =>
      ChainRec.tailRec<Either<E, Either<A, B>>, Either<E, B>>(f(a), (either) =>
        either.isLeft()
          ? Either.right(Either.left(either.left))
          : either.right.isLeft()
          ? Either.left(f(either.right.left))
          : Either.right(Either.right(either.right.right)))
});
