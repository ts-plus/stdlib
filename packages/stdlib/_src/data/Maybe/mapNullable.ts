/**
 * This is `chain` + `fromNullable`, useful when working with optional values.
 *
 * @tsplus static Maybe.Aspects mapNullable
 * @tsplus pipeable Maybe mapNullable
 */
export function mapNullable<A, B>(f: (a: A) => B | null | undefined) {
  return (self: Maybe<A>): Maybe<B> =>
    self.isNone() ? Maybe.none : Maybe.fromNullable(f(self.value))
}
