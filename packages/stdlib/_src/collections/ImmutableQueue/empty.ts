import { ImmutableQueueInternal } from "@tsplus/stdlib/collections/ImmutableQueue/_internal/ImmutableQueueInternal"

/**
 * @tsplus static ImmutableQueue.Ops empty
 */
export function empty<A = never>(): ImmutableQueue<A> {
  return new ImmutableQueueInternal(List.nil())
}
