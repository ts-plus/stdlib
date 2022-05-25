/**
 * Constructs a new `NonEmptyImmutableArray`.
 *
 * @tsplus static NonEmptyImmutableArray/Ops __call
 * @tsplus static NonEmptyImmutableArray/Ops make
 */
export function make<A, As extends ReadonlyArray<A>>(head: A, ...rest: As): NonEmptyImmutableArray<A> {
  return new ImmutableArray([head, ...rest]) as NonEmptyImmutableArray<A>
}
