/**
 * This is `chain` + `fromNullable`, useful when working with optional values.
 *
 * @tsplus fluent Option mapNullable
 */
export function mapNullable_<A, B>(
  self: Option<A>,
  f: (a: A) => B | null | undefined
): Option<B> {
  return self.isNone() ? Option.none : Option.fromNullable(f(self.value))
}

/**
 * @tsplus static Option/Aspects mapNullable
 */
export const mapNullable = Pipeable(mapNullable_)
