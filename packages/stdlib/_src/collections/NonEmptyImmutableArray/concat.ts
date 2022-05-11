/**
 * @tsplus operator NonEmptyImmutableArray &
 * @tsplus fluent NonEmptyImmutableArray concat
 */
export function concat_<A, B>(
  self: NonEmptyImmutableArray<A>,
  that: NonEmptyImmutableArray<B>
): NonEmptyImmutableArray<A | B>;
export function concat_<A, B>(self: NonEmptyImmutableArray<A>, that: ImmutableArray<B>): NonEmptyImmutableArray<A | B>;
export function concat_<A, B>(self: NonEmptyImmutableArray<A>, that: ImmutableArray<B>): NonEmptyImmutableArray<A | B> {
  return new ImmutableArray([...self.array, ...that.array] as any) as NonEmptyImmutableArray<A | B>;
}

/**
 * @tsplus static NonEmptyImmutableArray/Aspects concat
 */
export function concat<B>(that: NonEmptyImmutableArray<B>) {
  return <A>(self: NonEmptyImmutableArray<A>): NonEmptyImmutableArray<A | B> => self & that;
}

/**
 * Concatenates two NonEmptyImmutableArray together
 *
 * @tsplus operator NonEmptyImmutableArray +
 */
export function concatOperator<A>(
  self: NonEmptyImmutableArray<A>,
  that: NonEmptyImmutableArray<A>
): NonEmptyImmutableArray<A>;
export function concatOperator<A>(self: NonEmptyImmutableArray<A>, that: ImmutableArray<A>): NonEmptyImmutableArray<A>;
export function concatOperator<A>(self: NonEmptyImmutableArray<A>, that: ImmutableArray<A>): NonEmptyImmutableArray<A> {
  return self & that;
}
