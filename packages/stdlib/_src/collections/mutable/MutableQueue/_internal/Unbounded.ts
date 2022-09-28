import {
  EmptyMutableQueue,
  MutableQueueSym
} from "@tsplus/stdlib/collections/mutable/MutableQueue/definition"

export class Unbounded<A> implements MutableQueue<A> {
  readonly [MutableQueueSym]: MutableQueueSym = MutableQueueSym

  private queue = new DoublyLinkedList<A>();

  [Hash.sym]() {
    return Hash.randomCached(this)
  }

  [Equals.sym](that: unknown) {
    return this === that
  }

  get size(): number {
    return this.queue.length
  }

  get isEmpty(): boolean {
    return this.size === 0
  }

  get isFull(): boolean {
    return false
  }

  get capacity(): number {
    return Number.MAX_SAFE_INTEGER
  }

  offer(a: A): boolean {
    this.queue.add(a)
    return true
  }

  offerAll(as: Collection<A>): Chunk<A> {
    for (const a of as) {
      this.offer(a)
    }
    return Chunk.empty()
  }

  poll<D>(a: D): A | D {
    if (this.isEmpty) {
      return a
    }
    return this.queue.shift()!
  }

  pollUpTo(n: number): Chunk<A> {
    let result = Chunk.empty<A>()
    let count = 0

    while (count < n) {
      const elem = this.poll(EmptyMutableQueue)
      if (elem === EmptyMutableQueue) {
        break
      }
      result = result.append(elem)
      count += 1
    }

    return result
  }

  [Symbol.iterator](): Iterator<A> {
    return this.queue[Symbol.iterator]()
  }
}
