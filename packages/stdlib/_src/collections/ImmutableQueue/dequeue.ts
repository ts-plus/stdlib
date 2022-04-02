import {
  concreteImmutableQueue,
  ImmutableQueueInternal
} from "@tsplus/stdlib/collections/ImmutableQueue/_internal/ImmutableQueueInternal";

/**
 * @tsplus fluent ImmutableQueue dequeue
 */
export function dequeue<A>(self: ImmutableQueue<A>): Option<Tuple<[NonNullable<A>, ImmutableQueue<A>]>> {
  concreteImmutableQueue(self);
  const size = self.backingList.length();
  if (size === 0) {
    return Option.none;
  }
  return Option.some(
    Tuple(
      self.backingList.unsafeHead()!,
      size === 1
        ? new ImmutableQueueInternal(List.nil())
        : new ImmutableQueueInternal(self.backingList.unsafeTail()!)
    )
  );
}
