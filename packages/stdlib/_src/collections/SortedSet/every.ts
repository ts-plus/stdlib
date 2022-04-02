/**
 * Returns `true` if all elements match the specified predicate, otherwise
 * returns `false`.
 *
 * @tsplus fluent SortedSet every
 */
export function every_<A>(self: SortedSet<A>, f: Predicate<A>): boolean {
  return !self.some((a) => !f(a));
}

/**
 * Returns `true` if all elements match the specified predicate, otherwise
 * returns `false`.
 *
 * @tsplus static SortedSet/Aspects every
 */
export const every = Pipeable(every_);
