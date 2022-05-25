declare global {
  /**
   * @tsplus type Collection
   */
  export interface Iterable<T> {}
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
