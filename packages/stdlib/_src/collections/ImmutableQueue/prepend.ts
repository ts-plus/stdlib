import {
  concreteImmutableQueue,
  ImmutableQueueInternal
} from "@tsplus/stdlib/collections/ImmutableQueue/_internal/ImmutableQueueInternal"

/**
 * @tsplus static ImmutableQueue.Aspects prepend
 * @tsplus pipeable ImmutableQueue prepend
 */
export function prepend<A>(value: A) {
  return (self: ImmutableQueue<A>): ImmutableQueue<A> => {
    concreteImmutableQueue(self)
    return new ImmutableQueueInternal(self.backingList.prepend(value))
  }
}
