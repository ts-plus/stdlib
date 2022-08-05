import { EmptyHashMapPatch } from "@tsplus/stdlib/collections/HashMap/patch/definition"

/**
 * Constructs an empty map patch.
 *
 * @tsplus static Differ.HashMap.Patch.Ops empty
 */
export function emptyPatch<Key, Value, Patch>(): Differ.HashMap.Patch<Key, Value, Patch> {
  return new EmptyHashMapPatch()
}
