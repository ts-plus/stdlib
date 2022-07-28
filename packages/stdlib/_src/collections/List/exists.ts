/**
 * @tsplus static List.Aspects exists
 * @tsplus pipeable List exists
 */
export function exists<A>(p: Predicate<A>) {
  return (self: List<A>): boolean => {
    let these = self
    while (!these.isNil()) {
      if (p(these.head)) {
        return true
      }
      these = these.tail
    }
    return false
  }
}
