import { concreteSortedMap } from "@tsplus/stdlib/collections/SortedMap/_internal/SortedMapInternal";

/**
 * @tsplus fluent SortedMap reduceWithIndex
 */
export function reduceWithIndex_<K, V, A>(
  self: SortedMap<K, V>,
  z: A,
  f: (b: A, k: K, v: V) => A
) {
  concreteSortedMap(self);
  return self.tree.reduceWithIndex(z, f);
}

/**
 * @tsplus static SortedMap/Aspects reduceWithIndex
 */
export const reduceWithIndex = Pipeable(reduceWithIndex_);
