/**
 * Returns the empty `List`
 *
 * @tsplus static List.Ops empty
 */
export function empty<A = never>(): List<A> {
  return List.nil()
}
