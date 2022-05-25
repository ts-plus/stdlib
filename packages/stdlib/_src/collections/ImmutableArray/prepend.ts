/**
 * Prepends `a` to ImmutableArray<A>
 *
 * @tsplus operator ImmutableArray + 1.0
 */
export function prependOperatorStrict<A>(a: A, self: ImmutableArray<A>): NonEmptyImmutableArray<A> {
  return new ImmutableArray([a, ...self.array]) as NonEmptyImmutableArray<A>
}

/**
 * Prepends `a` to ImmutableArray<A>
 *
 * @tsplus operator ImmutableArray >
 */
export function prependOperator<A, B>(a: A, self: ImmutableArray<B>): NonEmptyImmutableArray<A | B> {
  return new ImmutableArray([a, ...self.array] as any) as NonEmptyImmutableArray<A>
}

/**
 * Prepends `a` to ImmutableArray<A>
 *
 * @tsplus fluent ImmutableArray prepend
 */
export function prepend_<A, B>(self: ImmutableArray<A>, a: B): NonEmptyImmutableArray<A | B> {
  return new ImmutableArray([a, ...self.array]) as NonEmptyImmutableArray<A>
}

/**
 * @tsplus static ImmutableArray/Aspects prepend
 */
export const prepend = Pipeable(prepend_)
