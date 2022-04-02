/**
 * Constructs a new `HashMap` from an array of key/value pairs.
 *
 * @tsplus static HashMap/Ops __call
 */
export function fromEntries<Entries extends Tuple<[any, any]>[]>(
  ...entries: Entries
): HashMap<
  Entries[number] extends Tuple<[infer K, any]> ? K : never,
  Entries[number] extends Tuple<[any, infer V]> ? V : never
> {
  const map = HashMap.empty<
    Entries[number] extends Tuple<[infer K, any]> ? K : never,
    Entries[number] extends Tuple<[any, infer V]> ? V : never
  >().beginMutation();

  for (const entry of entries) {
    map.set(entry.get(0), entry.get(1));
  }

  return map.endMutation();
}
