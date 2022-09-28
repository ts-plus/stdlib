const defaultSeparate = [Maybe.none, Maybe.none] as const

/**
 * @tsplus getter Maybe separate
 */
export function separate<A, B>(
  self: Maybe<Either<A, B>>
): readonly [Maybe<A>, Maybe<B>] {
  const maybe = self.map((either) => [either.left, either.right] as const)
  return maybe.isNone() ? defaultSeparate : maybe.value
}
