/**
 * Separate elements based on a predicate that also exposes the index.
 *
 * @tsplus static ImmutableArray.Aspects partitionWithIndex
 * @tsplus pipeable ImmutableArray partitionWithIndex
 */
export function partitionWithIndex<A>(f: PredicateWithIndex<number, A>) {
  return (self: ImmutableArray<A>): readonly [ImmutableArray<A>, ImmutableArray<A>] => {
    const left: Array<A> = []
    const right: Array<A> = []
    for (let i = 0; i < self.array.length; i = i + 1) {
      const a = self.array[i]!
      if (f(i, a)) {
        right.push(a)
      } else {
        left.push(a)
      }
    }
    return [new ImmutableArray(left), new ImmutableArray(right)]
  }
}
