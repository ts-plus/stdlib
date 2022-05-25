/**
 * @tsplus fluent List map
 */
export function map_<A, B>(self: List<A>, f: (a: A) => B): List<B> {
  if (self.isNil()) {
    return self as unknown as List<B>
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

export const map = Pipeable(map_)
