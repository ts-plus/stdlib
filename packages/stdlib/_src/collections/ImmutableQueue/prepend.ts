import {
  concreteImmutableQueue,
  ImmutableQueueInternal
} from "@tsplus/stdlib/collections/ImmutableQueue/_internal/ImmutableQueueInternal";

/**
 * @tsplus fluent ImmutableQueue prepend
 */
export function prepend_<A>(self: ImmutableQueue<A>, value: A): ImmutableQueue<A> {
  concreteImmutableQueue(self);
  return new ImmutableQueueInternal(self.backingList.prepend(value));
}

/**
 * @tsplus static ImmutableQueue/Aspects prepend
 */
export const prepend = Pipeable(prepend_);
