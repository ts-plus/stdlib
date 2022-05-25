/**
 * Inserts an element at the beginning of a `List`, returning a new `List`
 *
 * @tsplus fluent List prepend
 */
export function prepend_<A, B>(self: List<A>, elem: B): List.NonEmpty<A | B> {
  return List.cons<A | B>(elem, self)
}

export const prepend = Pipeable(prepend_)

/**
 * Inserts an element at the beginning of a `List`, returning a new `List`
 *
 * @tsplus operator List +
 */
export function prependOperatorStrict<A>(elem: A, list: List<A>): List.NonEmpty<A> {
  return List.cons(elem, list)
}

/**
 * Inserts an element at the beginning of a `List`, returning a new `List`
 *
 * @tsplus operator List >
 */
export function prependOperator<A, B>(elem: A, list: List<B>): List<A | B> {
  return List.cons<A | B>(elem, list)
}
