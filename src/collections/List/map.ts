import { List } from "./definition.js"

/**
 * @tsplus fluent List map
 */
export function map<A, B>(self: List<A>, f: (a: A) => B): List<B> {
  if (self.isNil()) {
    return self as List<B>
  } else {
    const h = List.cons(f(self.head), List.nil())
    let t = h
    let rest = self.tail
    while (!rest.isNil()) {
      const nx = List.cons(f(rest.head), List.nil())
      t.tail = nx
      t = nx
      rest = rest.tail
    }
    return h
  }
}
