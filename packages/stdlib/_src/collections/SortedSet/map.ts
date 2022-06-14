/**
 * @tsplus fluent SortedSet map
 */
export function map_<A, B>(
  self: SortedSet<A>,
  ord: Ord<B>,
  f: (a: A) => B
): SortedSet<B> {
  let out = SortedSet.empty(ord)
  self.forEach((a) => {
    const b = f(a)
    if (!out.has(b)) {
      out = out.add(b)
    }
  })
  return out
}

/**
 * @tsplus static SortedSet/Aspects map
 */
export const map = Pipeable(map_)
