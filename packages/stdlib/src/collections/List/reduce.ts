import type { List } from "../List.js"

/**
 * @tsplus fluent List reduce
 */
export function reduce_<A, B>(self: List<A>, b: B, f: (b: B, a: A) => B): B {
  let acc = b
  let these = self
  while (!these.isNil()) {
    acc = f(acc, these.head)
    these = these.tail
  }
  return acc
}

export const reduce = Pipeable(reduce_)
