/**
 * Constructs a new `NonEmptyImmutableArray`.
 *
 * @tsplus static NonEmptyImmutableArray/Ops __call
 * @tsplus static NonEmptyImmutableArray/Ops make
 */
export function make<As extends readonly any[]>(head: As[number], ...rest: As): NonEmptyImmutableArray<As[number]> {
  return new ImmutableArray([head, ...rest]) as NonEmptyImmutableArray<As[number]>
}
