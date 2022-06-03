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
 * @tsplus type CollectionOps
 */
export interface CollectionOps {}
export const Collection: CollectionOps = {}

/**
 * @tsplus macro pipe
 * @tsplus fluent Collection __call
 */
export const collectionPipe: typeof pipe = pipe
