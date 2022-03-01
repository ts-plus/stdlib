import { Option } from "../../data/Option.js"
import type { Predicate } from "../../data/Predicate.js"
import type { List } from "./definition.js"

/**
 * @tsplus fluent List find
 */
export function find<A>(self: List<A>, p: Predicate<A>): Option<A> {
  let these = self
  while (!these.isNil()) {
    if (p(these.head)) {
      return Option.some(these.head)
    }
    these = these.tail
  }
  return Option.none
}
