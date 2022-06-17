import {
  concreteImmutableQueue,
  ImmutableQueueInternal
} from "@tsplus/stdlib/collections/ImmutableQueue/_internal/ImmutableQueueInternal"

/**
 * @tsplus fluent ImmutableQueue appendAll
 */
export function appendAll_<A>(self: ImmutableQueue<A>, value: Collection<A>): ImmutableQueue<A> {
  concreteImmutableQueue(self)
  return new ImmutableQueueInternal(self.backingList + value.toList)
}

/**
 * @tsplus static ImmutableQueue/Aspects appendAll
 */
export const appendAll = Pipeable(appendAll_)
