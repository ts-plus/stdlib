import {
  concreteImmutableQueue,
  ImmutableQueueInternal
} from "@tsplus/stdlib/collections/ImmutableQueue/_internal/ImmutableQueueInternal";

/**
 * @tsplus fluent ImmutableQueue filter
 */
export function filter_<A, B extends A>(self: ImmutableQueue<A>, f: Refinement<A, B>): ImmutableQueue<B>;
export function filter_<A>(self: ImmutableQueue<A>, f: Predicate<A>): ImmutableQueue<A>;
export function filter_<A>(self: ImmutableQueue<A>, f: Predicate<A>): ImmutableQueue<A> {
  concreteImmutableQueue(self);
  return new ImmutableQueueInternal(self.backingList.filter(f));
}

/**
 * @tsplus static ImmutableQueue/Aspects filter
 */
export function filter<A, B extends A>(f: Refinement<A, B>): (self: ImmutableQueue<A>) => ImmutableQueue<B>;
export function filter<A>(f: Predicate<A>): (self: ImmutableQueue<A>) => ImmutableQueue<A>;
export function filter<A>(f: Predicate<A>) {
  return (self: ImmutableQueue<A>): ImmutableQueue<A> => self.filter(f);
}
