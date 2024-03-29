/**
 * Constructs a differ that knows how to diff a `Chunk` of values given a
 * differ that knows how to diff the values.
 *
 * @tsplus static Differ.Ops chunk
 */
export function chunk<Value, Patch>(
  differ: Differ<Value, Patch>
): Differ<Chunk<Value>, Differ.Chunk.Patch<Value, Patch>> {
  return Differ.make({
    empty: Differ.Chunk.empty(),
    combine: (first, second) => first.combine(second),
    diff: (oldValue, newValue) => Differ.Chunk.diff(oldValue, newValue, differ),
    patch: (patch, oldValue) => patch.apply(oldValue, differ)
  })
}
