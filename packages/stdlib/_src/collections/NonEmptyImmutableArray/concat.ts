/**
 * @tsplus pipeable-operator NonEmptyImmutableArray &
 * @tsplus static NonEmptyImmutableArray.Aspects concat
 * @tsplus pipeable NonEmptyImmutableArray.Aspects concat
 */
export function concat<B>(that: ImmutableArray<B>) {
  return <A>(self: NonEmptyImmutableArray<A>): NonEmptyImmutableArray<A | B> =>
    new ImmutableArray([...self.array, ...that.array] as any) as NonEmptyImmutableArray<A | B>
}

/**
 * Concatenates two NonEmptyImmutableArray together
 *
 * @tsplus operator NonEmptyImmutableArray +
 */
export function concatOperator<A>(
  self: NonEmptyImmutableArray<A>,
  that: NonEmptyImmutableArray<A>
): NonEmptyImmutableArray<A>
export function concatOperator<A>(self: NonEmptyImmutableArray<A>, that: ImmutableArray<A>): NonEmptyImmutableArray<A>
export function concatOperator<A>(self: NonEmptyImmutableArray<A>, that: ImmutableArray<A>): NonEmptyImmutableArray<A> {
  return self & that
}
