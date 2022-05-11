/**
 * Filters the `ImmutableArray` and maps the output using the specified
 * function.
 *
 * @tsplus fluent ImmutableArray collectWithIndex
 */
export function collectWithIndex_<A, B>(self: ImmutableArray<A>, f: (i: number, a: A) => Option<B>): ImmutableArray<B> {
  const results: Array<B> = [];
  for (let i = 0; i < self.array.length; i = i + 1) {
    const optionB = f(i, self.array[i]!);
    if (optionB._tag === "Some") {
      results.push(optionB.value);
    }
  }
  return ImmutableArray.from(results);
}

/**
 * Filters the `ImmutableArray` and maps the output using the specified
 * function.
 *
 * @tsplus static ImmutableArray/Aspects collectWithIndex
 */
export const collectWithIndex = Pipeable(collectWithIndex_);
