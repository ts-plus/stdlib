/**
 * Filters the `ImmutableArray` and maps the output using the specified
 * function.
 *
 * @tsplus static ImmutableArray.Aspects collect
 * @tsplus pipeable ImmutableArray collect
 */
export function collect<A, B>(f: (a: A) => Maybe<B>) {
  return (self: ImmutableArray<A>): ImmutableArray<B> => self.collectWithIndex((_, a) => f(a))
}
