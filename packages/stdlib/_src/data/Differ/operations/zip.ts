/**
 * Combines this differ and the specified differ to produce a new differ that
 * knows how to diff the product of their values.
 *
 * @tsplus static Differ.Aspects zip
 * @tsplus pipeable Differ zip
 */
export function zip<Value2, Patch2>(that: Differ<Value2, Patch2>) {
  return <Value, Patch>(
    self: Differ<Value, Patch>
  ): Differ<readonly [Value, Value2], readonly [Patch, Patch2]> =>
    Differ.make({
      empty: [self.empty, that.empty] as const,
      combine: (
        first,
        second
      ) => [self.combine(first[0], second[0]), that.combine(first[1], second[1])],
      diff: (
        oldValue,
        newValue
      ) => [
        self.diff(oldValue[0], newValue[0]),
        that.diff(oldValue[1], newValue[1])
      ],
      patch: (
        patch,
        oldValue
      ) => [self.patch(patch[0], oldValue[0]), that.patch(patch[1], oldValue[1])]
    })
}
