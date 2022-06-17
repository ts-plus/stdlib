import {
  concreteImmutableQueue,
  ImmutableQueueInternal
} from "@tsplus/stdlib/collections/ImmutableQueue/_internal/ImmutableQueueInternal"

/**
 * @tsplus getter ImmutableQueue dequeue
 */
export function dequeue<A>(self: ImmutableQueue<A>): Maybe<Tuple<[NonNullable<A>, ImmutableQueue<A>]>> {
  concreteImmutableQueue(self)
  const size = self.backingList.length
  if (size === 0) {
    return Maybe.none
  }
  return Maybe.some(
    Tuple(
      self.backingList.unsafeHead!,
      size === 1
        ? new ImmutableQueueInternal(List.nil())
        : new ImmutableQueueInternal(self.backingList.unsafeTail!)
    )
  )
}
