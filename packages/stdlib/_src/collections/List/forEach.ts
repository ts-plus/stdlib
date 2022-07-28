/**
 * @tsplus static List.Aspects forEach
 * @tsplus pipeable List forEach
 */
export function forEach<A, U>(f: (a: A) => U) {
  return (self: List<A>): void => {
    let these = self
    while (!these.isNil()) {
      f(these.head)
      these = these.tail
    }
  }
}
