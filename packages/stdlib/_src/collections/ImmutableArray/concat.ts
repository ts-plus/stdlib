/**
 * @tsplus operator ImmutableArray &
 * @tsplus fluent ImmutableArray concat
 */
export function concat_<A, B>(
  self: ImmutableArray<A>,
  that: ImmutableArray<B>
): ImmutableArray<A | B> {
  return new ImmutableArray([...self.array, ...that.array])
}

/**
 * @tsplus static ImmutableArray/Aspects concat
 */
export const concat = Pipeable(concat_)

/**
 * Concatenates two ImmutableArray together
 *
 * @tsplus operator ImmutableArray +
 */
export const concatOperator: <A>(
  self: ImmutableArray<A>,
  that: ImmutableArray<A>
) => ImmutableArray<A> = concat_
