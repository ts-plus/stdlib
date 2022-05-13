import * as P from "@tsplus/stdlib/prelude/ChainRec";

/**
 * @tsplus static Either/Ops ChainRec
 */
export const ChainRec = HKT.instance<P.ChainRec<Either.HKT>>({
  chainRec: <A, B, E>(f: (a: A) => Either<E, Either<A, B>>) =>
    (a: A): Either<E, B> =>
      P.ChainRec.tailRec<Either<E, Either<A, B>>, Either<E, B>>(f(a), (either) =>
        either.isLeft()
          ? Either.right(Either.left(either.left))
          : either.right.isLeft()
          ? Either.left(f(either.right.left))
          : Either.right(Either.right(either.right.right)))
});
