import { AndThenHashSetPatch } from "@tsplus/stdlib/collections/HashSet/patch/definition"

/**
 * Combines two set patches to produce a new set patch that describes
 * applying their changes sequentially.
 *
 * @tsplus static Differ.HashSet.Patch.Aspects combine
 * @tsplus pipeable Differ.HashSet.Patch combine
 */
export function combine<Value>(that: Differ.HashSet.Patch<Value>) {
  return (self: Differ.HashSet.Patch<Value>): Differ.HashSet.Patch<Value> =>
    new AndThenHashSetPatch(self, that)
}
