/**
 * Creates a new `ImmutableMap` make a set of entries.
 *
 * @tsplus static ImmutableMap.Ops __call
 * @tsplus static ImmutableMap.Ops make
 */
export function make<Entries extends (readonly [any, any])[]>(
  ...entries: Entries
): ImmutableMap<
  Entries[number] extends readonly [infer K, any] ? K : never,
  Entries[number] extends readonly [any, infer V] ? V : never
> {
  return ImmutableMap.from(entries)
}
