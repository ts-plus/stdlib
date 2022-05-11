/**
 * Constructs a `NonEmptyImmutableArray` from a `Collection`, returning `None`
 * if the provided `Collection` is empty.
 *
 * @tsplus static NonEmptyImmutableArray/Ops from
 */
export function from<A>(collection: Collection<A>): Option<NonEmptyImmutableArray<A>> {
  const array = Array.from(collection);
  return array.length === 0 ? Option.none : Option.some(new ImmutableArray(array as any) as NonEmptyImmutableArray<A>);
}
