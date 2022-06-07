/**
 * Separate elements based on a predicate.
 *
 * @tsplus fluent List partition
 */
export function partition_<A>(self: List<A>, f: Predicate<A>): Tuple<[List<A>, List<A>]> {
  const left: Array<A> = []
  const right: Array<A> = []
  for (const a of self) {
    if (f(a)) {
      right.push(a)
    } else {
      left.push(a)
    }
  }
  return Tuple(List.from(left), List.from(right))
}

/**
 * Separate elements based on a predicate.
 *
 * @tsplus static List/Aspects partition
 */
export const partition = Pipeable(partition_)
