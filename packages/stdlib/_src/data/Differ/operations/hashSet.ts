/**
 * Constructs a differ that knows how to diff a `HashSet` of values.
 *
 * @tsplus static Differ.Ops hashSet
 */
export function hashSet<Value>(): Differ<HashSet<Value>, Differ.HashSet.Patch<Value>> {
  return Differ.make({
    empty: Differ.HashSet.empty(),
    combine: (first, second) => first.combine(second),
    diff: (oldValue, newValue) => Differ.HashSet.diff(oldValue, newValue),
    patch: (patch, oldValue) => patch.apply(oldValue)
  })
}
