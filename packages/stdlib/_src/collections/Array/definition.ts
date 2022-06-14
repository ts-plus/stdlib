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

/**
 * @tsplus macro pipe
 * @tsplus fluent Array __call
 */
export const ArrayPipe: typeof pipe = pipe
