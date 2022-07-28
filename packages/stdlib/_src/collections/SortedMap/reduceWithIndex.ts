import { concreteSortedMap } from "@tsplus/stdlib/collections/SortedMap/_internal/SortedMapInternal"

/**
 * @tsplus static SortedMap.Aspects reduceWithIndex
 * @tsplus pipeable SortedMap reduceWithIndex
 */
export function reduceWithIndex<K, V, A>(z: A, f: (b: A, k: K, v: V) => A) {
  return (self: SortedMap<K, V>): A => {
    concreteSortedMap(self)
    return self.tree.reduceWithIndex(z, f)
  }
}
