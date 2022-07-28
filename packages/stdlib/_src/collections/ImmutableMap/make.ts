/**
 * Creates a new `ImmutableMap` make a set of entries.
 *
 * @tsplus static ImmutableMap.Ops __call
 * @tsplus static ImmutableMap.Ops make
 */
export function make<Entries extends Tuple<[any, any]>[]>(
  ...entries: Entries
): ImmutableMap<
  Entries[number] extends Tuple<[infer K, any]> ? K : never,
  Entries[number] extends Tuple<[any, infer V]> ? V : never
> {
  return ImmutableMap.from(entries)
}
