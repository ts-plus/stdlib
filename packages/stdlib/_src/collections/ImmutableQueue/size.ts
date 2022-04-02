import { concreteImmutableQueue } from "@tsplus/stdlib/collections/ImmutableQueue/_internal/ImmutableQueueInternal";

/**
 * @tsplus getter ImmutableQueue size
 */
export function size<A>(self: ImmutableQueue<A>): number {
  concreteImmutableQueue(self);
  return self.backingList.length();
}
