/**
 * Constructs a new `HashMap` from an array of key/value pairs.
 *
 * @tsplus static HashMap.Ops make
 * @tsplus static HashMap.Ops __call
 */
export function make<Entries extends Tuple<[any, any]>[]>(
  ...entries: Entries
): HashMap<
  Entries[number] extends Tuple<[infer K, any]> ? K : never,
  Entries[number] extends Tuple<[any, infer V]> ? V : never
> {
  return HashMap.from(entries)
}
