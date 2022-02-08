import { List } from "./definition.js"

/**
 * Reverses a `List`, returning a new `List`
 */
export function reverse<A>(self: List<A>): List<A> {
  let result = List.empty<A>()
  let these = self
  while (!these.isNil()) {
    result = result.prepend(these.head)
    these = these.tail
  }
  return result
}
