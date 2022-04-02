import {
  concreteImmutableQueue,
  ImmutableQueueInternal
} from "@tsplus/stdlib/collections/ImmutableQueue/_internal/ImmutableQueueInternal";

/**
 * @tsplus fluent ImmutableQueue append
 */
export function append_<A>(self: ImmutableQueue<A>, value: A): ImmutableQueue<A> {
  concreteImmutableQueue(self);
  return new ImmutableQueueInternal(self.backingList + List(value));
}

/**
 * @tsplus static ImmutableQueue/Aspects append
 */
export const append = Pipeable(append_);
