import { AndThenHashMapPatch } from "@tsplus/stdlib/collections/HashMap/patch/definition"

/**
 * Combines two map patches to produce a new map patch that describes
 * applying their changes sequentially.
 *
 * @tsplus static Differ.HashMap.Patch.Aspects combine
 * @tsplus pipeable Differ.HashMap.Patch combine
 */
export function combine<Key, Value, Patch>(that: Differ.HashMap.Patch<Key, Value, Patch>) {
  return (self: Differ.HashMap.Patch<Key, Value, Patch>): Differ.HashMap.Patch<Key, Value, Patch> =>
    new AndThenHashMapPatch(self, that)
}
