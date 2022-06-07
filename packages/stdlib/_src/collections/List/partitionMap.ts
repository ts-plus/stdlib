/**
 * Partitions the elements of this List into two Lists using the specified
 * function.
 *
 * @tsplus fluent List partitionMap
 */
export function partitionMap_<A, B, C>(
  self: List<A>,
  f: (a: A) => Either<B, C>
): Tuple<[List<B>, List<C>]> {
  const left: Array<B> = []
  const right: Array<C> = []
  for (const a of self) {
    const e = f(a)
    if (e._tag === "Left") {
      left.push(e.left)
    } else {
      right.push(e.right)
    }
  }
  return Tuple(List.from(left), List.from(right))
}

/**
 * Partitions the elements of this List into two Lists using the specified
 * function.
 *
 * @tsplus static List/Aspects partitionMap
 */
export const partitionMap = Pipeable(partitionMap_)
