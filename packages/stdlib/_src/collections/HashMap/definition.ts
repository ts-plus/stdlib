export const HashMapSym = Symbol.for("@tsplus/stdlib/collection/HashMap")
export type HashMapSym = typeof HashMapSym

export const _K = Symbol.for("@tsplus/stdlib/collection/HashMap/K")
export type _K = typeof _K

export const _V = Symbol.for("@tsplus/stdlib/collection/HashMap/V")
export type _V = typeof _V

/**
 * @tsplus type HashMap
 */
export interface HashMap<K, V> extends Collection<readonly [K, V]>, Equals {
  readonly [HashMapSym]: HashMapSym
  readonly [_K]: () => K
  readonly [_V]: () => V
  [Symbol.iterator](): Iterator<readonly [K, V]>
}

/**
 * @tsplus type HashMap.Ops
 */
export interface HashMapOps {
  $: HashMapAspects
}
export const HashMap: HashMapOps = {
  $: {}
}

/**
 * @tsplus type HashMap.Aspects
 */
export interface HashMapAspects {}

/**
 * @tsplus unify HashMap
 */
export function unifyHashMap<X extends HashMap<any, any>>(
  self: X
): HashMap<
  [X] extends [HashMap<infer K, any>] ? K : never,
  [X] extends [HashMap<any, infer V>] ? V : never
> {
  return self
}

/**
 * @tsplus static HashMap.Ops isHashMap
 */
export function isHashMap<K, V>(u: Iterable<readonly [K, V]>): u is HashMap<K, V>
export function isHashMap(u: unknown): u is HashMap<unknown, unknown>
export function isHashMap(u: unknown): u is HashMap<unknown, unknown> {
  return typeof u === "object" && u != null && HashMapSym in u
}
