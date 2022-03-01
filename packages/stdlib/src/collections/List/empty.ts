import { List } from "./definition.js"

/**
 * Returns the empty `List`
 *
 * @tsplus static ListOps empty
 */
export function empty<A>(): List<A> {
  return List.nil()
}
