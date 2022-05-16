/**
 * @tsplus static Either/Ops getShow
 */
export function getShow<E, A>(SE: Show<E>, SA: Show<A>): Show<Either<E, A>> {
  return Show((either) => either.isLeft() ? `Left(${SE.show(either.left)})` : `Right(${SA.show(either.right)})`);
}
