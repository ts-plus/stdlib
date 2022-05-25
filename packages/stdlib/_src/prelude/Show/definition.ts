/**
 * `Show<A>` is an abstraction that describes the ability to render a value of
 * type `A` to a string.
 *
 * @tsplus type Show
 */
export interface Show<A> {
  readonly Law: {
    readonly Show: "Show"
  }
  readonly show: (a: A) => string
}

/**
 * @tsplus type Show/Ops
 */
export interface ShowOps {
  <A>(show: (a: A) => string): Show<A>
}
export const Show: ShowOps = <A>(show: (a: A) => string): Show<A> => HKT.instance({ show })
