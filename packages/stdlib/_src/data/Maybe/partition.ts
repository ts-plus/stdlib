/**
 * @tsplus fluent Maybe partition
 */
export function partition_<A, B extends A>(
  self: Maybe<A>,
  f: Refinement<A, B>
): Tuple<[Maybe<A>, Maybe<B>]>
export function partition_<A>(
  self: Maybe<A>,
  f: Predicate<A>
): Tuple<[Maybe<A>, Maybe<A>]>
export function partition_<A>(
  self: Maybe<A>,
  f: Predicate<A>
): Tuple<[Maybe<A>, Maybe<A>]> {
  return Tuple(self.filter((a) => !f(a)), self.filter(f))
}

/**
 * @tsplus static Maybe/Aspects partition
 */
export function partition<A, B extends A>(f: Refinement<A, B>): (self: Maybe<A>) => Tuple<[Maybe<A>, Maybe<B>]>
export function partition<A>(f: Predicate<A>): (self: Maybe<A>) => Tuple<[Maybe<A>, Maybe<A>]>
export function partition<A>(f: Predicate<A>) {
  return (self: Maybe<A>): Tuple<[Maybe<A>, Maybe<A>]> => self.partition(f)
}
