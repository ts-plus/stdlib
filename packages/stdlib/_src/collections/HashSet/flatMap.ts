/**
 * Chains over the values of the `HashSet` using the specified function.
 *
 * @tsplus fluent HashSet flatMap
 */
export function flatMap_<A, B>(self: HashSet<A>, f: (a: A) => Iterable<B>): HashSet<B> {
  const set = HashSet.empty<B>();
  return set.mutate((_) => {
    self.forEach((e) => {
      for (const a of f(e)) {
        if (!_.has(a)) {
          _.add(a);
        }
      }
    });
  });
}

/**
 * Chains over the values of the `HashSet` using the specified function.
 *
 * @tsplus static HashSet/Aspects flatMap
 */
export const flatMap = Pipeable(flatMap_);
