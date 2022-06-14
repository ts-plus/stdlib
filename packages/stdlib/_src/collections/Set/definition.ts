declare global {
  /**
   * @tsplus type Set
   */
  export interface Set<T> extends Collection<T> {}
  /**
   * @tsplus type Set/Ops
   */
  export interface SetConstructor {
  }
}

/**
 * @tsplus macro pipe
 * @tsplus fluent Set __call
 */
export const SetPipe: typeof pipe = pipe
