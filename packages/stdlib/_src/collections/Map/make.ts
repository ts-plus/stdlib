/**
 * Constructs a new `Map`.
 *
 * @tsplus static Map.Ops __call
 * @tsplus static Map.Ops make
 */
export function make<Entries extends Tuple<[any, any]>[]>(
  ...data: Entries
): Map<
  Entries[number] extends Tuple<[infer K, any]> ? K : never,
  Entries[number] extends Tuple<[any, infer V]> ? V : never
> {
  return Map.from(data)
}
