/**
 * Constructs a new `MutableHashMap` from an array of key/value pairs.
 *
 * @tsplus static MutableHashMap/Ops __call
 */
export function fromEntries<Entries extends Tuple<[any, any]>[]>(
  ...entries: Entries
): MutableHashMap<
  Entries[number] extends Tuple<[infer K, any]> ? K : never,
  Entries[number] extends Tuple<[any, infer V]> ? V : never
> {
  const map = MutableHashMap.empty<
    Entries[number] extends Tuple<[infer K, any]> ? K : never,
    Entries[number] extends Tuple<[any, infer V]> ? V : never
  >()

  for (const entry of entries) {
    map.set(entry.get(0), entry.get(1))
  }

  return map
}
