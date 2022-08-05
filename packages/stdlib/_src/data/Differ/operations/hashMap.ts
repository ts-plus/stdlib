/**
 * Constructs a differ that knows how to diff a `HashMap` of keys and values given
 * a differ that knows how to diff the values.
 *
 * @tsplus static Differ.Ops hashMap
 */
export function hashMap<Key, Value, Patch>(
  differ: Differ<Value, Patch>
): Differ<HashMap<Key, Value>, Differ.HashMap.Patch<Key, Value, Patch>> {
  return Differ.make({
    empty: Differ.HashMap.empty(),
    combine: (first, second) => first.combine(second),
    diff: (oldValue, newValue) => Differ.HashMap.diff(oldValue, newValue, differ),
    patch: (patch, oldValue) => patch.apply(oldValue, differ)
  })
}
