/**
 * Concatenates two lists together
 *
 * @tsplus fluent List concat
 * @tsplus operator List &
 */
export function concat_<A, B>(self: List<A>, that: List<B>): List<A | B> {
  return that.prependAll(self);
}

export const concat = Pipeable(concat_);

/**
 * Concatenates two lists together
 *
 * @tsplus operator List +
 */
export function concatOperator<A>(self: List<A>, that: List<A>): List<A> {
  return that.prependAll(self);
}
