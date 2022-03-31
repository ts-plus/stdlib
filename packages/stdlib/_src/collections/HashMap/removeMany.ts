/**
 * Removes all entries in the `HashMap` which have the specified keys.
 *
 * @tsplus fluent HashMap removeMany
 */
export function removeMany_<K, V>(self: HashMap<K, V>, ks: Iterable<K>): HashMap<K, V> {
  return self.mutate((m) => {
    for (const k of ks) {
      m.remove(k);
    }
  });
}

/**
 * Removes all entries in the `HashMap` which have the specified keys.
 *
 * @tsplus static HashMap/Aspects removeMany
 */
export const removeMany = Pipeable(removeMany_);
