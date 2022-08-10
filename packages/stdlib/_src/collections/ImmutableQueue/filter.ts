import {
  concreteImmutableQueue,
  ImmutableQueueInternal
} from "@tsplus/stdlib/collections/ImmutableQueue/_internal/ImmutableQueueInternal"

/**
 * @tsplus static ImmutableQueue.Aspects filter
 * @tsplus pipeable ImmutableQueue filter
 */
export function filter<A, B extends A>(
  f: Refinement<A, B>
): (self: ImmutableQueue<A>) => ImmutableQueue<B>
export function filter<A>(f: Predicate<A>): (self: ImmutableQueue<A>) => ImmutableQueue<A>
export function filter<A>(f: Predicate<A>) {
  return (self: ImmutableQueue<A>): ImmutableQueue<A> => {
    concreteImmutableQueue(self)
    return new ImmutableQueueInternal(self.backingList.filter(f))
  }
}
