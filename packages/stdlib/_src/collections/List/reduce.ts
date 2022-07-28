/**
 * @tsplus static List.Aspects reduce
 * @tsplus pipeable List reduce
 */
export function reduce<A, B>(b: B, f: (b: B, a: A) => B) {
  return (self: List<A>): B => {
    let acc = b
    let these = self
    while (!these.isNil()) {
      acc = f(acc, these.head)
      these = these.tail
    }
    return acc
  }
}
