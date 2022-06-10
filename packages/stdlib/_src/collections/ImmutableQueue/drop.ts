import {
  concreteImmutableQueue,
  ImmutableQueueInternal
} from "@tsplus/stdlib/collections/ImmutableQueue/_internal/ImmutableQueueInternal"

/**
 * @tsplus fluent ImmutableQueue drop
 */
export function drop_<A>(self: ImmutableQueue<A>, n: number): ImmutableQueue<A> {
  concreteImmutableQueue(self)
  return new ImmutableQueueInternal(self.backingList.drop(n))
}

/**
 * @tsplus static ImmutableQueue/Aspects drop
 */
export const drop = Pipeable(drop_)
