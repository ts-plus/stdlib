import { AndThenOrPatch } from "@tsplus/stdlib/data/Differ/OrPatch/definition"

/**
 * Combines two or patches to produce a new or patch that describes applying
 * their changes sequentially.
 *
 * @tsplus static Differ.Or.Patch.Aspects combine
 * @tsplus pipeable Differ.Or.Patch combine
 */
export function combine<Value, Value2, Patch, Patch2>(
  that: Differ.Or.Patch<Value, Value2, Patch, Patch2>
) {
  return (
    self: Differ.Or.Patch<Value, Value2, Patch, Patch2>
  ): Differ.Or.Patch<Value, Value2, Patch, Patch2> => new AndThenOrPatch(self, that)
}
