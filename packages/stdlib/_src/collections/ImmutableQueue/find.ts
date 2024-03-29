import { concreteImmutableQueue } from "@tsplus/stdlib/collections/ImmutableQueue/_internal/ImmutableQueueInternal"

/**
 * @tsplus static ImmutableQueue.Aspects find
 * @tsplus pipeable ImmutableQueue find
 */
export function find<A, B extends A>(f: Refinement<A, B>): (self: ImmutableQueue<A>) => Maybe<B>
export function find<A>(f: Predicate<A>): (self: ImmutableQueue<A>) => Maybe<A>
export function find<A>(f: Predicate<A>) {
  return (self: ImmutableQueue<A>): Maybe<A> => {
    concreteImmutableQueue(self)
    return self.backingList.find(f)
  }
}
