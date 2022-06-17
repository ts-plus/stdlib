const defaultSeparate = Tuple(Maybe.none, Maybe.none)

/**
 * @tsplus getter Maybe separate
 */
export function separate<A, B>(
  self: Maybe<Either<A, B>>
): Tuple<[Maybe<A>, Maybe<B>]> {
  const maybe = self.map((either) => Tuple(either.left, either.right))
  return maybe.isNone() ? defaultSeparate : maybe.value
}
