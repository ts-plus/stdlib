/**
 * Appends `a` to ImmutableArray<A>
 *
 * @tsplus fluent ImmutableArray append
 * @tsplus operator ImmutableArray <
 */
export function append_<A, B>(self: ImmutableArray<A>, a: B): NonEmptyImmutableArray<A | B> {
  return new ImmutableArray([...self.array, a] as any) as NonEmptyImmutableArray<A>
}

/**
 * @tsplus static ImmutableArray/Aspects append
 */
export const append = Pipeable(append_)

/**
 * @tsplus operator ImmutableArray + 1.0
 */
export const appendOperator: <A>(self: ImmutableArray<A>, a: A) => NonEmptyImmutableArray<A> = append_
