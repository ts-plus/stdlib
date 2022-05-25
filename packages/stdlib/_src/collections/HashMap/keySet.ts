import { HashSetInternal } from "@tsplus/stdlib/collections/HashSet/_internal/hashSet"

/**
 * Returns a `HashSet` of keys within the `HashMap`.
 *
 * @tsplus fluent HashMap keySet
 */
export function keySet<K, V>(self: HashMap<K, V>): HashSet<K> {
  return new HashSetInternal(self)
}
