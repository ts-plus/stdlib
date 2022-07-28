/**
 * Inserts an element at the beginning of a `List`, returning a new `List`
 *
 * @tsplus static List.Aspects prepend
 * @tsplus pipeable List prepend
 */
export function prepend<A, B>(elem: B) {
  return (self: List<A>): List.NonEmpty<A | B> => List.cons<A | B>(elem, self)
}

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
