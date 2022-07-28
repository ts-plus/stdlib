/**
 * @tsplus static List.Aspects flatMap
 * @tsplus pipeable List flatMap
 */
export function flatMap<A, B>(f: (a: A) => List<B>) {
  return (self: List<A>): List<B> => {
    let rest = self
    let h: List.Cons<B> | undefined = undefined
    let t: List.Cons<B> | undefined = undefined
    while (!rest.isNil()) {
      let bs = f(rest.head)
      while (!bs.isNil()) {
        const nx = List.cons(bs.head, List.nil())
        if (t === undefined) {
          h = nx
        } else {
          t.tail = nx
        }
        t = nx
        bs = bs.tail
      }
      rest = rest.tail
    }
    if (h === undefined) return List.nil()
    else return h
  }
}
