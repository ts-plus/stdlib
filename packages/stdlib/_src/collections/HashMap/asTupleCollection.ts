import { realHashMap } from "@tsplus/stdlib/collections/HashMap/_internal/hashMap";

/**
 * Returns an `Iterable` of key/value pairs contained in the `HashMap` wrapped
 * in a `Tuple`.
 *
 * @tsplus fluent HashMap asTupleCollection
 */
export function asTupleCollection<K, V>(self: HashMap<K, V>): Collection<Tuple<[K, V]>> {
  realHashMap(self);
  return self._tupleIterator;
}
