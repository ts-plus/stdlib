import {
  concreteImmutableQueue,
  ImmutableQueueInternal
} from "@tsplus/stdlib/collections/ImmutableQueue/_internal/ImmutableQueueInternal"
import { Tuple } from "@tsplus/stdlib/data/Tuple"

/**
 * @tsplus static ImmutableQueue.Aspects splitAt
 * @tsplus pipeable ImmutableQueue splitAt
 */
export function splitAt(n: number) {
  return <A>(self: ImmutableQueue<A>): Tuple<[ImmutableQueue<A>, ImmutableQueue<A>]> => {
    concreteImmutableQueue(self)
    const { tuple: [a, b] } = self.backingList.splitAt(n)
    return Tuple.make(new ImmutableQueueInternal(a), new ImmutableQueueInternal(b))
  }
}
