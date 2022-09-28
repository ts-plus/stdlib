/**
 * Constructs a new `MutableHashMap` from an array of key/value pairs.
 *
 * @tsplus static MutableHashMap.Ops __call
 * @tsplus static MutableHashMap.Ops make
 */
export function make<Entries extends (readonly [any, any])[]>(
  ...entries: Entries
): MutableHashMap<
  Entries[number] extends readonly [infer K, any] ? K : never,
  Entries[number] extends readonly [any, infer V] ? V : never
> {
  return MutableHashMap.from(entries)
}
