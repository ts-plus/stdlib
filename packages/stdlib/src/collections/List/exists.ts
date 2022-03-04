import type { Predicate } from "../../data/Predicate.js"
import type { List } from "./definition.js"

/**
 * @tsplus fluent List exists
 */
export function exists_<A>(self: List<A>, p: Predicate<A>): boolean {
  let these = self
  while (!these.isNil()) {
    if (p(these.head)) {
      return true
    }
    these = these.tail
  }
  return false
}

export const exists = Pipeable(exists_)
