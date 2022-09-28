/**
 * Constructs a new `HashMap` from an array of key/value pairs.
 *
 * @tsplus static HashMap.Ops make
 * @tsplus static HashMap.Ops __call
 */
export function make<Entries extends (readonly [any, any])[]>(
  ...entries: Entries
): HashMap<
  Entries[number] extends readonly [infer K, any] ? K : never,
  Entries[number] extends readonly [any, infer V] ? V : never
> {
  return HashMap.from(entries)
}
