import { concreteImmutableQueue } from "@tsplus/stdlib/collections/ImmutableQueue/_internal/ImmutableQueueInternal"

/**
 * @tsplus fluent ImmutableQueue splitAt
 */
export function splitAt_<A>(self: ImmutableQueue<A>, n: number): Tuple<[List<A>, List<A>]> {
  concreteImmutableQueue(self)
  return self.backingList.splitAt(n)
}

/**
 * @tsplus static ImmutableQueue/Aspects splitAt
 */
export const splitAt = Pipeable(splitAt_)
