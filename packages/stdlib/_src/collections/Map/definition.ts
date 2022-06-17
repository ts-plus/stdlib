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
