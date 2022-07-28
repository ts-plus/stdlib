/**
 * Appends `a` to ImmutableArray<A>
 *
 * @tsplus static ImmutableArray.Aspects append
 * @tsplus pipeable ImmutableArray append
 * @tsplus pipeable-operator ImmutableArray <
 */
export function append<A, B>(a: B) {
  return (self: ImmutableArray<A>): NonEmptyImmutableArray<A | B> =>
    new ImmutableArray([...self.array, a] as any) as NonEmptyImmutableArray<A>
}

/**
 * @tsplus pipeable-operator ImmutableArray + 1.0
 */
export function appendOperator<A>(a: A) {
  return (self: ImmutableArray<A>): NonEmptyImmutableArray<A> => self.append(a)
}
