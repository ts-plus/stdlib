const defaultSeparate = Tuple(Option.none, Option.none);

/**
 * @tsplus fluent Option separate
 */
export function separate<A, B>(
  self: Option<Either<A, B>>
): Tuple<[Option<A>, Option<B>]> {
  const option = self.map((either) => Tuple(either.left, either.right));
  return option.isNone() ? defaultSeparate : option.value;
}
