/**
 * This is `chain` + `fromNullable`, useful when working with optional values.
 *
 * @tsplus fluent Maybe mapNullable
 */
export function mapNullable_<A, B>(
  self: Maybe<A>,
  f: (a: A) => B | null | undefined
): Maybe<B> {
  return self.isNone() ? Maybe.none : Maybe.fromNullable(f(self.value))
}

/**
 * @tsplus static Maybe/Aspects mapNullable
 */
export const mapNullable = Pipeable(mapNullable_)
