declare global {
  /**
   * @tsplus type Collection
   */
  export interface Iterable<T> {}

  export interface Map<K, V> extends Iterable<[K, V]> {}
  export interface Set<T> extends Iterable<T> {}
  export interface Array<T> extends Iterable<T> {}
  export interface ReadonlyArray<T> extends Iterable<T> {}
}

export type Collection<A> = ESIterable<A>

/**
 * @tsplus type Collection.Ops
 */
export interface CollectionOps {
  readonly $: CollectionAspects
}
export const Collection: CollectionOps = {
  $: {}
}

/**
 * @tsplus type Collection.Aspects
 */
export interface CollectionAspects {}
