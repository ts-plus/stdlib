/**
 * Filters entries out of a `HashMap` using the specified predicate.
 *
 * @tsplus fluent HashMap filterWithIndex
 */
export function filterWithIndex_<K, A, B extends A>(
  self: HashMap<K, A>,
  f: (k: K, a: A) => a is B
): HashMap<K, B>;
export function filterWithIndex_<K, A>(
  self: HashMap<K, A>,
  f: (k: K, a: A) => boolean
): HashMap<K, A>;
export function filterWithIndex_<K, A>(
  self: HashMap<K, A>,
  f: (k: K, a: A) => boolean
): HashMap<K, A> {
  const m = HashMap.empty<K, A>();
  return m.mutate((m) => {
    for (const { tuple: [k, a] } of self) {
      if (f(k, a)) {
        m.set(k, a);
      }
    }
  });
}

/**
 * Filters entries out of a `HashMap` using the specified predicate.
 *
 * @tsplus static HashMap/Aspects filterWithIndex
 */
export function filterWithIndex<K, A, B extends A>(
  f: (k: K, a: A) => a is B
): (self: HashMap<K, A>) => HashMap<K, B>;
export function filterWithIndex<K, A>(
  f: (k: K, a: A) => boolean
): (self: HashMap<K, A>) => HashMap<K, A>;
export function filterWithIndex<K, A>(f: (k: K, a: A) => boolean) {
  return (self: HashMap<K, A>) => self.filterWithIndex(f);
}
