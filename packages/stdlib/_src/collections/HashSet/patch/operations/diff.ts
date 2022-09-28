import {
  AddHashSetPatch,
  RemoveHashSetPatch
} from "@tsplus/stdlib/collections/HashSet/patch/definition"

/**
 * Constructs a set patch from a new set of values.
 *
 * @tsplus static Differ.HashSet.Patch.Ops diff
 */
export function diff<Value>(
  oldValue: HashSet<Value>,
  newValue: HashSet<Value>
): Differ.HashSet.Patch<Value> {
  const [removed, patch] = newValue.reduce(
    [oldValue, Differ.HashSet.empty<Value>()] as const,
    ([set, patch], value) => {
      if (set.has(value)) {
        return [set.remove(value), patch]
      }
      return [set, patch.combine(new AddHashSetPatch(value))]
    }
  )
  return removed.reduce(patch, (patch, value) => patch.combine(new RemoveHashSetPatch(value)))
}
