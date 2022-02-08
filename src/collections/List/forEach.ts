import type { List } from "./definition.js"

/**
 * @tsplus fluent List forEach
 */
export function forEach<A, U>(self: List<A>, f: (a: A) => U): void {
  let these = self
  while (!these.isNil()) {
    f(these.head)
    these = these.tail
  }
}
