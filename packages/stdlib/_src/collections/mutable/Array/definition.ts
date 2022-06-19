declare global {
  /**
   * @tsplus type Array
   */
  export interface Array<T> extends Collection<T> {}
  /**
   * @tsplus type Array/Ops
   */
  export interface ArrayConstructor {
  }
}
