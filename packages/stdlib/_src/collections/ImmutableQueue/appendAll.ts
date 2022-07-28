import {
  concreteImmutableQueue,
  ImmutableQueueInternal
} from "@tsplus/stdlib/collections/ImmutableQueue/_internal/ImmutableQueueInternal"

/**
 * @tsplus static ImmutableQueue.Aspects appendAll
 * @tsplus pipeable ImmutableQueue appendAll
 */
export function appendAll<A>(value: Collection<A>) {
  return (self: ImmutableQueue<A>): ImmutableQueue<A> => {
    concreteImmutableQueue(self)
    return new ImmutableQueueInternal(self.backingList + value.toList)
  }
}
