/**
 * Chains over the values of the `HashSet` using the specified function.
 *
 * @tsplus fluent HashSet flatMap
 */
export function flatMap_<A, B>(self: HashSet<A>, f: (a: A) => Collection<B>): HashSet<B> {
  const set = HashSet.empty<B>();
  return set.mutate((_) => {
    self.forEach((a) => {
      for (const b of f(a)) {
        if (!_.has(b)) {
          _.add(b);
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
