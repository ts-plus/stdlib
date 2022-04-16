/**
 * Creates a new `ImmutableMap` from a set of entries.
 *
 * @tsplus static ImmutableMap/Ops __call
 * @tsplus static ImmutableMap/Ops from
 */
export function from<Entries extends Tuple<[any, any]>[]>(
  ...entries: Entries
): ImmutableMap<
  Entries[number] extends Tuple<[infer K, any]> ? K : never,
  Entries[number] extends Tuple<[any, infer V]> ? V : never
> {
  const map = new Map();
  for (const { tuple: [key, value] } of entries) {
    map.set(key, value);
  }
  return new ImmutableMap(map);
}
