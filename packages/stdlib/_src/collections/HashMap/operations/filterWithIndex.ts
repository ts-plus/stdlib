/**
 * Filters entries out of a `HashMap` using the specified predicate.
 *
 * @tsplus static HashMap.Aspects filterWithIndex
 * @tsplus pipeable HashMap filterWithIndex
 */
export function filterWithIndex<K, A, B extends A>(
  f: (k: K, a: A) => a is B
): (self: HashMap<K, A>) => HashMap<K, B>
export function filterWithIndex<K, A>(
  f: (k: K, a: A) => boolean
): (self: HashMap<K, A>) => HashMap<K, A>
export function filterWithIndex<K, A>(f: (k: K, a: A) => boolean) {
  return (self: HashMap<K, A>): HashMap<K, A> => {
    const m = HashMap.empty<K, A>()
    return m.mutate((m) => {
      for (const [k, a] of self) {
        if (f(k, a)) {
          m.set(k, a)
        }
      }
    })
  }
}
