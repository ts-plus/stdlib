import { concreteImmutableQueue } from "@tsplus/stdlib/collections/ImmutableQueue/_internal/ImmutableQueueInternal"

/**
 * @tsplus getter ImmutableQueue head
 */
export function head<A>(self: ImmutableQueue<A>): Maybe<A> {
  concreteImmutableQueue(self)
  return self.backingList.head
}
