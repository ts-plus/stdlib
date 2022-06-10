import {
  concreteImmutableQueue,
  ImmutableQueueInternal
} from "@tsplus/stdlib/collections/ImmutableQueue/_internal/ImmutableQueueInternal"
import { Tuple } from "@tsplus/stdlib/data/Tuple"

/**
 * @tsplus fluent ImmutableQueue splitAt
 */
export function splitAt_<A>(self: ImmutableQueue<A>, n: number): Tuple<[ImmutableQueue<A>, ImmutableQueue<A>]> {
  concreteImmutableQueue(self)
  const { tuple: [a, b] } = self.backingList.splitAt(n)
  return Tuple.make(new ImmutableQueueInternal(a), new ImmutableQueueInternal(b))
}

/**
 * @tsplus static ImmutableQueue/Aspects splitAt
 */
export const splitAt = Pipeable(splitAt_)
