import { EmptyHashSetPatch } from "@tsplus/stdlib/collections/HashSet/patch/definition"

/**
 * Constructs an empty set patch.
 *
 * @tsplus static Differ.HashSet.Patch.Ops empty
 */
export function emptyPatch<Value>(): Differ.HashSet.Patch<Value> {
  return new EmptyHashSetPatch()
}
