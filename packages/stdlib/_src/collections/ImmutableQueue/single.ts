import { ImmutableQueueInternal } from "@tsplus/stdlib/collections/ImmutableQueue/_internal/ImmutableQueueInternal"

/**
 * @tsplus static ImmutableQueue/Ops single
 */
export function single<A>(value: A): ImmutableQueue<A> {
  return new ImmutableQueueInternal(List.cons(value, List.nil()))
}
