/**
 * Filters the `ImmutableArray` and maps the output using the specified
 * function.
 *
 * @tsplus static ImmutableArray.Aspects collectWithIndex
 * @tsplus pipeable ImmutableArray collectWithIndex
 */
export function collectWithIndex<A, B>(f: (i: number, a: A) => Maybe<B>) {
  return (self: ImmutableArray<A>): ImmutableArray<B> => {
    const results: Array<B> = []
    for (let i = 0; i < self.array.length; i = i + 1) {
      const optionB = f(i, self.array[i]!)
      if (optionB._tag === "Some") {
        results.push(optionB.value)
      }
    }
    return ImmutableArray.from(results)
  }
}
