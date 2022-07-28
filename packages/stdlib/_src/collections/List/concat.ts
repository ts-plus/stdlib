/**
 * Concatenates two lists together
 *
 * @tsplus pipeable-operator List &
 * @tsplus static List.Aspects concat
 * @tsplus pipeable List concat
 */
export function concat<B>(that: List<B>) {
  return <A>(self: List<A>): List<A | B> => that.prependAll(self)
}

/**
 * Concatenates two lists together
 *
 * @tsplus operator List +
 */
export function concatOperator<A>(self: List.NonEmpty<A>, that: List.NonEmpty<A>): List<A>
export function concatOperator<A>(self: List.NonEmpty<A>, that: List<A>): List.NonEmpty<A>
export function concatOperator<A>(self: List<A>, that: List.NonEmpty<A>): List.NonEmpty<A>
export function concatOperator<A>(self: List<A>, that: List<A>): List<A>
export function concatOperator<A>(self: List<A>, that: List<A>): List<A> {
  return that.prependAll(self)
}
