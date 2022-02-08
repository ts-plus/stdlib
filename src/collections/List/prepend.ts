import { List } from "./definition.js"

/**
 * Inserts an element at the beginning of a `List`, returning a new `List`
 *
 * @tsplus fluent List prepend
 */
export function prepend<A, B>(self: List<A>, elem: B): List<A | B> {
  return List.cons<A | B>(elem, self)
}
