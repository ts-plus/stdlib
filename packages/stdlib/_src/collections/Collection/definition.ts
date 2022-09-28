declare global {
  /**
   * @tsplus type Collection
   */
  export interface Iterable<T> {}
  /**
   * @tsplus type Map
   */
  export interface Map<K, V> extends Iterable<[K, V]> {}
  /**
   * @tsplus type Set
   */
  export interface Set<T> extends Iterable<T> {}
  /**
   * @tsplus type Array
   */
  export interface Array<T> extends Iterable<T> {}
  /**
   * @tsplus type ReadonlyArray
   */
  export interface ReadonlyArray<T> extends Iterable<T> {}
  /**
   * @tsplus type Array.Ops
   */
  export interface ArrayConstructor {
  }
  /**
   * @tsplus type Set.Ops
   */
  export interface SetConstructor {
  }
  /**
   * @tsplus type Map.Ops
   */
  export interface MapConstructor {
  }
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
