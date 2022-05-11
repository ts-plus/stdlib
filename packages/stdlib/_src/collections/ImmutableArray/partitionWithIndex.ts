/**
 * Separate elements based on a predicate that also exposes the index.
 *
 * @tsplus fluent ImmutableArray partitionWithIndex
 */
export function partitionWithIndex_<A>(
  self: ImmutableArray<A>,
  f: PredicateWithIndex<number, A>
): Tuple<[ImmutableArray<A>, ImmutableArray<A>]> {
  const left: Array<A> = [];
  const right: Array<A> = [];
  for (let i = 0; i < self.array.length; i = i + 1) {
    const a = self.array[i]!;
    if (f(i, a)) {
      right.push(a);
    } else {
      left.push(a);
    }
  }
  return Tuple(new ImmutableArray(left), new ImmutableArray(right));
}

/**
 * Separate elements based on a predicate that also exposes the index.
 *
 * @tsplus static ImmutableArray/Aspects partitionWithIndex
 */
export const partitionWithIndex = Pipeable(partitionWithIndex_);
