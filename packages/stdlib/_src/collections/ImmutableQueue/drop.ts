import {
  concreteImmutableQueue,
  ImmutableQueueInternal
} from "@tsplus/stdlib/collections/ImmutableQueue/_internal/ImmutableQueueInternal"

/**
 * @tsplus static ImmutableQueue.Aspects drop
 * @tsplus pipeable ImmutableQueue drop
 */
export function drop(n: number) {
  return <A>(self: ImmutableQueue<A>): ImmutableQueue<A> => {
    concreteImmutableQueue(self)
    return new ImmutableQueueInternal(self.backingList.drop(n))
  }
}
