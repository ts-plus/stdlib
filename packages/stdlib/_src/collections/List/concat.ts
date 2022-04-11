/**
 * Concatenates two lists together
 *
 * @tsplus fluent List concat
 * @tsplus operator List &
 */
export function concat_<A, B>(self: List.NonEmpty<A>, that: List.NonEmpty<B>): List.NonEmpty<A | B>;
export function concat_<A, B>(self: List.NonEmpty<A>, that: List<B>): List.NonEmpty<A | B>;
export function concat_<A, B>(self: List<A>, that: List.NonEmpty<B>): List.NonEmpty<A | B>;
export function concat_<A, B>(self: List<A>, that: List<B>): List<A | B>;
export function concat_<A, B>(self: List<A>, that: List<B>): List<A | B> {
  return that.prependAll(self);
}

export function concat<B>(that: List<B>) {
  return <A>(self: List<A>): List<A | B> => that.prependAll(self);
}

/**
 * Concatenates two lists together
 *
 * @tsplus operator List +
 */
export function concatOperator<A>(self: List.NonEmpty<A>, that: List.NonEmpty<A>): List<A>;
export function concatOperator<A>(self: List.NonEmpty<A>, that: List<A>): List.NonEmpty<A>;
export function concatOperator<A>(self: List<A>, that: List.NonEmpty<A>): List.NonEmpty<A>;
export function concatOperator<A>(self: List<A>, that: List<A>): List<A>;
export function concatOperator<A>(self: List<A>, that: List<A>): List<A> {
  return that.prependAll(self);
}
