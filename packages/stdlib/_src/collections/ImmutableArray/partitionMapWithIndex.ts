/**
 * Separate elements based on a map function that also exposes the index.
 *
 * @tsplus static ImmutableArray.Aspects partitionMapWithIndex
 * @tsplus pipeable ImmutableArray partitionMapWithIndex
 */
export function partitionMapWithIndex<A, B, C>(f: (i: number, a: A) => Either<B, C>) {
  return (self: ImmutableArray<A>): readonly [ImmutableArray<B>, ImmutableArray<C>] => {
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
    return [new ImmutableArray(left), new ImmutableArray(right)]
  }
}
