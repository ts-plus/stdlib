import { List } from "@tsplus/stdlib/collections/List/definition"

/**
 * Inserts an element at the beginning of a `List`, returning a new `List`
 *
 * @tsplus fluent List prepend
 */
export function prepend_<A, B>(self: List<A>, elem: B): List<A | B> {
  return List.cons<A | B>(elem, self)
}

export const prepend = Pipeable(prepend_)

/**
 * Inserts an element at the beginning of a `List`, returning a new `List`
 *
 * @tsplus operator List +
 */
export function prependOperator<A>(elem: A, list: List<A>): List<A> {
  return List.cons(elem, list)
}
