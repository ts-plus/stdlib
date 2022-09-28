import {
  concreteImmutableQueue,
  ImmutableQueueInternal
} from "@tsplus/stdlib/collections/ImmutableQueue/_internal/ImmutableQueueInternal"

/**
 * @tsplus static ImmutableQueue.Aspects splitAt
 * @tsplus pipeable ImmutableQueue splitAt
 */
export function splitAt(n: number) {
  return <A>(self: ImmutableQueue<A>): readonly [ImmutableQueue<A>, ImmutableQueue<A>] => {
    concreteImmutableQueue(self)
    const [a, b] = self.backingList.splitAt(n)
    return [new ImmutableQueueInternal(a), new ImmutableQueueInternal(b)]
  }
}
