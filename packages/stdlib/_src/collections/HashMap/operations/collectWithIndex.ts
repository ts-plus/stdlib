/**
 * Maps over the entries of the `HashMap` using the specified partial function
 * and filters out `None` values.
 *
 * @tsplus static HashMap.Aspects collectWithIndex
 * @tsplus pipeable HashMap collectWithIndex
 */
export function collectWithIndex<K, A, B>(f: (k: K, a: A) => Maybe<B>) {
  return (self: HashMap<K, A>): HashMap<K, B> => {
    const m = HashMap.empty<K, B>()
    return m.mutate((m) => {
      for (const [k, a] of self) {
        const o = f(k, a)
        if (o.isSome()) {
          m.set(k, o.value)
        }
      }
    })
  }
}
