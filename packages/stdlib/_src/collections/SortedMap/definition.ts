export const SortedMapSym = Symbol.for("@tsplus/stdlib/collections/SortedMap")
export type SortedMapSym = typeof SortedMapSym

export const _K = Symbol.for("@tsplus/stdlib/collections/SortedMap/K")
export type _K = typeof _K

export const _V = Symbol.for("@tsplus/stdlib/collections/SortedMap/V")
export type _V = typeof _V

/**
 * @tsplus type SortedMap
 */
export interface SortedMap<K, V> extends Collection<readonly [K, V]>, Equals {
  readonly [SortedMapSym]: SortedMapSym
  readonly [_K]: () => K
  readonly [_V]: () => V
  [Symbol.iterator](): Iterator<readonly [K, V]>
}

/**
 * @tsplus type SortedMap.Ops
 */
export interface SortedMapOps {}
export const SortedMap: SortedMapOps = {}

/**
 * @tsplus type SortedMap.Aspects
 */
export interface SortedMapAspects {}
