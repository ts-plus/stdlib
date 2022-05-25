/**
 * Filters the `ImmutableArray` and maps the output using the specified
 * function.
 *
 * @tsplus fluent ImmutableArray collect
 */
export function collect_<A, B>(self: ImmutableArray<A>, f: (a: A) => Option<B>): ImmutableArray<B> {
  return self.collectWithIndex((_, a) => f(a))
}

/**
 * Filters the `ImmutableArray` and maps the output using the specified
 * function.
 *
 * @tsplus static ImmutableArray/Aspects collect
 */
export const collect = Pipeable(collect_)
