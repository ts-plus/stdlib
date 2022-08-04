/**
 * @tsplus static Set.Ops empty
 */
export function empty<A = never>(): Set<A> {
  return new Set<A>()
}
