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
  const { tuple: [removed, patch] } = newValue.reduce(
    Tuple(oldValue, Differ.HashSet.empty<Value>()),
    ({ tuple: [set, patch] }, value) => {
      if (set.has(value)) {
        return Tuple(set.remove(value), patch)
      }
      return Tuple(set, patch.combine(new AddHashSetPatch(value)))
    }
  )
  return removed.reduce(patch, (patch, value) => patch.combine(new RemoveHashSetPatch(value)))
}
