/**
 * @tsplus static Set/Ops from
 * @tsplus getter Collection asSet
 */
export function from<A>(data: Collection<A>): Set<A> {
  return new Set(data)
}
