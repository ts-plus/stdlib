export const ImmutableQueueSym = Symbol.for("@tsplus/stdlib/collections/ImmutableQueue")
export type ImmutableQueueSym = typeof ImmutableQueueSym

export const _A = Symbol.for("@tsplus/stdlib/collections/ImmutableQueue/A")
export type _A = typeof _A

/**
 * @tsplus type ImmutableQueue
 */
export interface ImmutableQueue<A> extends Collection<A>, Equals {
  readonly [ImmutableQueueSym]: ImmutableQueueSym
  readonly [_A]: () => A
}

/**
 * @tsplus type ImmutableQueue.Ops
 */
export interface ImmutableQueueOps {
  $: ImmutableQueueAspects
}
export const ImmutableQueue: ImmutableQueueOps = {
  $: {}
}

/**
 * @tsplus type ImmutableQueue.Aspects
 */
export interface ImmutableQueueAspects {}
