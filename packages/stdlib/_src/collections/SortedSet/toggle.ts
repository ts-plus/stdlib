/**
 * If element is present in the set then it will be removed, otherwise it will
 * be added.
 *
 * @tsplus static SortedSet.Aspects toggle
 * @tsplus pipeable SortedSet toggle
 */
export function toggle<A>(value: A) {
  return (self: SortedSet<A>): SortedSet<A> => self.has(value) ? self.remove(value) : self.add(value)
}
