/**
 * @tsplus static NonEmptyImmutableArray/Ops getShow
 */
export function getShow<A>(S: Show<A>): Show<NonEmptyImmutableArray<A>> {
  return Show((as) => `NonEmptyImmutableArray(${as.array.map(S.show).join(", ")})`);
}
