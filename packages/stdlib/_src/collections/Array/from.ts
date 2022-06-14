/**
 * @tsplus getter Collection asArray
 */
export function from<A>(data: Collection<A>): Array<A> {
  return Array.from(data)
}
