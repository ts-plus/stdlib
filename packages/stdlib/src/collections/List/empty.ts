import { List } from "@tsplus/stdlib/collections/List/definition"

/**
 * Returns the empty `List`
 *
 * @tsplus static ListOps empty
 */
export function empty<A>(): List<A> {
  return List.nil()
}
