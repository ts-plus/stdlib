export const MutableQueueSym = Symbol.for("@tsplus/stdlib/collections/mutable/MutableQueue")
export type MutableQueueSym = typeof MutableQueueSym

export const EmptyMutableQueue = Symbol.for("@tsplus/stdlib/collections/mutable/MutableQueue/Empty")
export type EmptyMutableQueue = typeof EmptyMutableQueue

/**
 * @tsplus type MutableQueue
 */
export interface MutableQueue<A> extends Collection<A>, Equals {
  readonly [MutableQueueSym]: MutableQueueSym

  /**
   * The **maximum** number of elements that a queue can hold.
   *
   * **Note**: unbounded queues can still implement this interface with
   * `capacity = Number.MAX_SAFE_INTEGER`.
   */
  readonly capacity: number

  /**
   * Enqueues an element into the queue.
   *
   * Returns whether the enqueue was successful or not.
   */
  readonly offer: (a: A) => boolean

  /**
   * Enqueues a collection of elements into the queue.
   *
   * Returns a `Chunk` of the elements that were **not** enqueued.
   */
  readonly offerAll: (a: Collection<A>) => Chunk<A>

  /**
   * Dequeues an element from the queue.
   *
   * Returns either an element from the queue, or the `default` param.
   *
   * **Note**: if there is no meaningful default for your type, you can always
   * use `poll(EmptyMutableQueue)`.
   */
  readonly poll: <D>(a: D) => A | D

  /**
   * Dequeues up to `n` elements from the queue.
   *
   * Returns a `Chunk` of up to `n` elements.
   */
  readonly pollUpTo: (n: number) => Chunk<A>

  /**
   * Returns the current number of elements in the queue.
   */
  readonly size: number

  /**
   * Returns whether or not the queue is empty.
   */
  readonly isEmpty: boolean

  /**
   * Returns whether or not the queue is full.
   */
  readonly isFull: boolean
}

/**
 * @tsplus type MutableQueue.Ops
 */
export interface MutableQueueOps {}
export const MutableQueue: MutableQueueOps = {}
