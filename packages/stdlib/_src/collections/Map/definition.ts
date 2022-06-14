declare global {
  /**
   * @tsplus type Map
   */
  export interface Map<K, V> extends Iterable<[K, V]> {}
  /**
   * @tsplus type Map/Ops
   */
  export interface MapConstructor {
  }
}

/**
 * @tsplus macro pipe
 * @tsplus fluent Map __call
 */
export const MapPipe: typeof pipe = pipe
