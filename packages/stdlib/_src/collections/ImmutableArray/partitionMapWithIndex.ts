/**
 * Separate elements based on a map function that also exposes the index.
 *
 * @tsplus fluent ImmutableArray partitionMapWithIndex
 */
export function partitionMapWithIndex_<A, B, C>(
  self: ImmutableArray<A>,
  f: (i: number, a: A) => Either<B, C>
): Tuple<[ImmutableArray<B>, ImmutableArray<C>]> {
  const left: Array<B> = []
  const right: Array<C> = []
  for (let i = 0; i < self.array.length; i = i + 1) {
    const e = f(i, self.array[i]!)
    if (e._tag === "Left") {
      left.push(e.left)
    } else {
      right.push(e.right)
    }
  }
  return Tuple(new ImmutableArray(left), new ImmutableArray(right))
}

/**
 * Separate elements based on a map function that also exposes the index.
 *
 * @tsplus static ImmutableArray/Aspects partitionMapWithIndex
 */
export const partitionMapWithIndex = Pipeable(partitionMapWithIndex_)
