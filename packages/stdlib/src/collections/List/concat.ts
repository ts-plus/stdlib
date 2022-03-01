import type { List } from "./definition.js"

/**
 * @tsplus fluent List concat
 * @tsplus operator List &
 */
export function concat<A, B>(self: List<A>, that: List<B>): List<A | B> {
  return that.prependAll(self)
}
