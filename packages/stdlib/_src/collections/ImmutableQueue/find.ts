import { concreteImmutableQueue } from "@tsplus/stdlib/collections/ImmutableQueue/_internal/ImmutableQueueInternal";

/**
 * @tsplus fluent ImmutableQueue find
 */
export function find_<A, B extends A>(self: ImmutableQueue<A>, f: Refinement<A, B>): Option<B>;
export function find_<A>(self: ImmutableQueue<A>, f: Predicate<A>): Option<A>;
export function find_<A>(self: ImmutableQueue<A>, f: Predicate<A>): Option<A> {
  concreteImmutableQueue(self);
  return self.backingList.find(f);
}

/**
 * @tsplus static ImmutableQueue/Aspects find
 */
export function find<A, B extends A>(f: Refinement<A, B>): (self: ImmutableQueue<A>) => Option<B>;
export function find<A>(f: Predicate<A>): (self: ImmutableQueue<A>) => Option<A>;
export function find<A>(f: Predicate<A>) {
  return (self: ImmutableQueue<A>): Option<A> => self.find(f);
}
