/**
 * Separate elements based on a predicate.
 *
 * @tsplus static List.Aspects partition
 * @tsplus pipeable List partition
 */
export function partition<A>(f: Predicate<A>) {
  return (self: List<A>): readonly [List<A>, List<A>] => {
    const left: Array<A> = []
    const right: Array<A> = []
    for (const a of self) {
      if (f(a)) {
        right.push(a)
      } else {
        left.push(a)
      }
    }
    return [List.from(left), List.from(right)]
  }
}
