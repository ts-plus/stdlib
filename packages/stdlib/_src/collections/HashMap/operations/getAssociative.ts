/**
 * Given an `Associative<V>` (a way to combine `V`'s, get an `Associative` to combine `<HashMap<K, V>>`'s
 * This preserves keys in both maps `V`
 *
 * @tsplus static HashMap.Ops getAssociative
 */
export function getAssociative<K, V>(A: Associative<V>): Associative<HashMap<K, V>> {
  return Associative((x, y) =>
    y.reduceWithIndex(x, (z, key, vy) =>
      z.has(key) ?
        z.update(key, (vx) => A.combine(vx, vy)) :
        z.set(key, vy))
  )
}
