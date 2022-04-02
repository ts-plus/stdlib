/**
 * Maps over the entries of the `HashMap` using the specified partial function
 * and filters out `None` values.
 *
 * @tsplus fluent HashMap collectWithIndex
 */
export function collectWithIndex_<K, A, B>(
  self: HashMap<K, A>,
  f: (k: K, a: A) => Option<B>
): HashMap<K, B> {
  const m = HashMap.empty<K, B>();
  return m.mutate((m) => {
    for (const { tuple: [k, a] } of self) {
      const o = f(k, a);
      if (o.isSome()) {
        m.set(k, o.value);
      }
    }
  });
}

/**
 * Maps over the entries of the `HashMap` using the specified partial function
 * and filters out `None` values.
 *
 * @tsplus static HashMap/Aspects collectWithIndex
 */
export const collectWithIndex = Pipeable(collectWithIndex_);
