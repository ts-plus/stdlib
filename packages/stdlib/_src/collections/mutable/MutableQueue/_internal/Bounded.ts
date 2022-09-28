import {
  EmptyMutableQueue,
  MutableQueueSym
} from "@tsplus/stdlib/collections/mutable/MutableQueue/definition"

export class Bounded<A> implements MutableQueue<A> {
  readonly [MutableQueueSym]: MutableQueueSym = MutableQueueSym

  private queue = new DoublyLinkedList<A>()

  private max: number

  constructor(max: number) {
    this.max = max
  }

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
    return this.size === this.capacity
  }

  get capacity(): number {
    return this.max
  }

  offer(value: A): boolean {
    if (this.isFull) {
      return false
    }
    this.queue.add(value)
    return true
  }

  offerAll(as: Collection<A>): Chunk<A> {
    const it = as[Symbol.iterator]()
    let next
    let rem = Chunk.empty<A>()
    let offering = true

    while (offering && (next = it.next()) && !next.done) {
      offering = this.offer(next.value)
    }

    while (next && !next.done) {
      rem = rem.append(next.value)
      next = it.next()
    }

    return rem
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
