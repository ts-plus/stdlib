/**
 * Partitions the elements of this List into two Lists using the specified
 * function.
 *
 * @tsplus static List.Aspects partitionMap
 * @tsplus pipeable List partitionMap
 */
export function partitionMap<A, B, C>(f: (a: A) => Either<B, C>) {
  return (self: List<A>): readonly [List<B>, List<C>] => {
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
    return [List.from(left), List.from(right)]
  }
}
