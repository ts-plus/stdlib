/**
 * If element is present in the set then it will be removed, otherwise it will
 * be added.
 *
 * @tsplus fluent SortedSet toggle
 */
export function toggle_<A>(self: SortedSet<A>, value: A): SortedSet<A> {
  return self.has(value) ? self.remove(value) : self.add(value);
}

/**
 * If element is present in the set then it will be removed, otherwise it will
 * be added.
 *
 * @tsplus static SortedSet/Aspects toggle
 */
export const toggle = Pipeable(toggle_);
