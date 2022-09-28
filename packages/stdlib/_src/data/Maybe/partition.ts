/**
 * @tsplus static Maybe.Aspects partition
 * @tsplus pipeable Maybe partition
 */
export function partition<A, B extends A>(
  f: Refinement<A, B>
): (self: Maybe<A>) => readonly [Maybe<A>, Maybe<B>]
export function partition<A>(f: Predicate<A>): (self: Maybe<A>) => readonly [Maybe<A>, Maybe<A>]
export function partition<A>(f: Predicate<A>) {
  return (
    self: Maybe<A>
  ): readonly [Maybe<A>, Maybe<A>] => [self.filter((a) => !f(a)), self.filter(f)]
}
