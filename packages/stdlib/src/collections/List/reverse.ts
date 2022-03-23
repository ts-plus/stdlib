import { List } from "@tsplus/stdlib/collections/List/definition";

/**
 * Reverses a `List`, returning a new `List`
 *
 * @tsplus fluent List reverse
 */
export function reverse<A>(self: List<A>): List<A> {
  let result = List.empty<A>();
  let these = self;
  while (!these.isNil()) {
    result = result.prepend(these.head);
    these = these.tail;
  }
  return result;
}
