export const HashSetSym = Symbol.for("@tsplus/stdlib/collections/HashSet")
export type HashSetSym = typeof HashSetSym

/**
 * @tsplus type HashSet
 */
export interface HashSet<A> extends Collection<A>, Equals {
  readonly [HashSetSym]: HashSetSym
  [Symbol.iterator](): Iterator<A>
}

/**
 * @tsplus type HashSet.Ops
 */
export interface HashSetOps {
  $: HashSetAspects
}
export const HashSet: HashSetOps = {
  $: {}
}

/**
 * @tsplus type HashSet.Aspects
 */
export interface HashSetAspects {}

/**
 * @tsplus unify HashSet
 */
export function unifyHashSet<X extends HashSet<any>>(
  self: X
): HashSet<[X] extends [HashSet<infer A>] ? A : never> {
  return self
}

/**
 * @tsplus static HashSet.Ops isHashSet
 */
export function isHashSet<A>(u: Iterable<A>): u is HashSet<A>
export function isHashSet(u: unknown): u is HashSet<unknown>
export function isHashSet(u: unknown): u is HashSet<unknown> {
  return typeof u === "object" && u != null && HashSetSym in u
}
