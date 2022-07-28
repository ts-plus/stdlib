/**
 * @tsplus static List.Aspects map
 * @tsplus pipeable List map
 */
export function map<A, B>(f: (a: A) => B) {
  return (self: List<A>): List<B> => {
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
}
