/**
 * Constructs a new `HashMap` from an array of key/value pairs.
 *
 * @tsplus static HashMap/Ops __call
 */
export function fromEntries<Entries extends [any, any][]>(
  ...entries: Entries
): HashMap<Entries[number][0], Entries[number][1]> {
  const map = HashMap.empty<Entries[number][0], Entries[number][1]>().beginMutation();

  for (const entry of entries) {
    map.set(entry[0], entry[1]);
  }

  return map.endMutation();
}
