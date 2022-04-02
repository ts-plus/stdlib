import { ImmutableQueueInternal } from "@tsplus/stdlib/collections/ImmutableQueue/_internal/ImmutableQueueInternal";

/**
 * @tsplus static ImmutableQueue/Ops __call
 */
export function make<A>(...values: Array<A>): ImmutableQueue<A> {
  return new ImmutableQueueInternal(List.from(values));
}
