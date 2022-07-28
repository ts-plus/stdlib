import type { ImmutableArray } from "@tsplus/stdlib/collections/ImmutableArray"

/**
 * Sort the elements of an `ImmutableArray<A>` in increasing order, where
 * elements are compared using first `ords[0]`, then `ords[1]`, then `ords[2]`,
 * etc.
 *
 * @tsplus static ImmutableArray.Aspects sortBy
 * @tsplus pipeable ImmutableArray sortBy
 */
export function sortBy<A>(...ords: Array<Ord<A>>) {
  return (self: ImmutableArray<A>): ImmutableArray<A> => {
    const O = Ord.consecutive(...ords)
    return self.sort(O)
  }
}
