/**
 * Returns `true` if the array contains no elements, otherwise returns `false`.
 *
 * @tsplus getter ImmutableArray isEmpty
 */
export function isEmpty<A>(self: ImmutableArray<A>): boolean {
  return self.array.length === 0
}
