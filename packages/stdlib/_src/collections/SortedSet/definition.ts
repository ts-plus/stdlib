export const SortedSetSym = Symbol.for("@tsplus/stdlib/collections/SortedSet");
export type SortedSetSym = typeof SortedSetSym;

export const _A = Symbol.for("@tsplus/stdlib/collections/SortedSet/A");
export type _A = typeof _A;

/**
 * @tsplus type SortedSet
 */
export interface SortedSet<A> extends Collection<A>, Equals {
  readonly [SortedSetSym]: SortedSetSym;
  readonly [_A]: () => A;
  [Symbol.iterator](): Iterator<A>;
}

/**
 * @tsplus type SortedSet/Ops
 */
export interface SortedSetOps {
  $: SortedSetAspects;
}
export const SortedSet: SortedSetOps = {
  $: {}
};

/**
 * @tsplus type SortedSet/Aspects
 */
export interface SortedSetAspects {}
