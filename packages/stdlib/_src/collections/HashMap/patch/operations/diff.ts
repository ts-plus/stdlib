import {
  AddHashMapPatch,
  RemoveHashMapPatch,
  UpdateHashMapPatch
} from "@tsplus/stdlib/collections/HashMap/patch/definition"

/**
 * Constructs a map patch from a new and old map of keys and values and a
 * differ for the values.
 *
 * @tsplus static Differ.HashMap.Patch.Ops diff
 */
export function diff<Key, Value, Patch>(
  oldValue: HashMap<Key, Value>,
  newValue: HashMap<Key, Value>,
  differ: Differ<Value, Patch>
): Differ.HashMap.Patch<Key, Value, Patch> {
  const [removed, patch] = newValue.reduceWithIndex(
    [oldValue, Differ.HashMap.empty<Key, Value, Patch>()] as const,
    ([map, patch], key, newValue) => {
      const maybe = map.get(key)
      switch (maybe._tag) {
        case "Some": {
          const valuePatch = differ.diff(maybe.value, newValue)
          if (Equals.equals(valuePatch, differ.empty)) {
            return [map.remove(key), patch]
          }
          return [map.remove(key), patch.combine(new UpdateHashMapPatch(key, valuePatch))]
        }
        case "None": {
          return [map, patch.combine(new AddHashMapPatch(key, newValue))]
        }
      }
    }
  )
  return removed.reduceWithIndex(
    patch,
    (patch, key, _) => patch.combine(new RemoveHashMapPatch(key))
  )
}
