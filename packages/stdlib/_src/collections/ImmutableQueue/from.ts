import { ImmutableQueueInternal } from "@tsplus/stdlib/collections/ImmutableQueue/_internal/ImmutableQueueInternal";

/**
 * @tsplus static ImmutableQueue/Ops from
 */
export function from<A>(collection: Collection<A>): ImmutableQueue<A> {
  return new ImmutableQueueInternal(List.from(collection));
}
