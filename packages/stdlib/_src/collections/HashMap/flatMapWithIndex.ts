/**
 * Chains over the entries of the `HashMap` using the specified function.
 *
 * **NOTE**: the hash and equal of both maps have to be the same.
 *
 * @tsplus fluent HashMap flatMapWithIndex
 */
export function flatMapWithIndex_<K, V, A>(
  self: HashMap<K, V>,
  f: (k: K, v: V) => HashMap<K, A>
): HashMap<K, A> {
  return self.reduceWithIndex(HashMap.empty<K, A>(), (z, k, v) =>
    z.mutate((m) => {
      f(k, v).forEachWithIndex((_k, _a) => {
        m.set(_k, _a);
      });
    }));
}

/**
 * Chains over the entries of the `HashMap` using the specified function.
 *
 * **NOTE**: the hash and equal of both maps have to be the same.
 *
 * @tsplus static HashMap/Aspects flatMapWithIndex
 */
export const flatMapWithIndex = Pipeable(flatMapWithIndex_);
