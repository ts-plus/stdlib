/**
 * @tsplus fluent SortedSet flatMap
 */
export function flatMap_<A, B>(
  self: SortedSet<A>,
  ord: Ord<B>,
  f: (a: A) => Collection<B>
): SortedSet<B> {
  let out = SortedSet.make<B>(ord)
  self.forEach((a) => {
    for (const b of f(a)) {
      if (!out.has(b)) {
        out = out.add(b)
      }
    }
  })
  return out
}

/**
 * @tsplus static SortedSet/Aspects flatMap
 */
export const flatMap = Pipeable(flatMap_)
