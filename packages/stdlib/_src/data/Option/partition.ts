/**
 * @tsplus fluent Option partition
 */
export function partition_<A, B extends A>(
  self: Option<A>,
  f: Refinement<A, B>
): Tuple<[Option<A>, Option<B>]>
export function partition_<A>(
  self: Option<A>,
  f: Predicate<A>
): Tuple<[Option<A>, Option<A>]>
export function partition_<A>(
  self: Option<A>,
  f: Predicate<A>
): Tuple<[Option<A>, Option<A>]> {
  return Tuple(self.filter((a) => !f(a)), self.filter(f))
}

/**
 * @tsplus static Option/Aspects partition
 */
export function partition<A, B extends A>(f: Refinement<A, B>): (self: Option<A>) => Tuple<[Option<A>, Option<B>]>
export function partition<A>(f: Predicate<A>): (self: Option<A>) => Tuple<[Option<A>, Option<A>]>
export function partition<A>(f: Predicate<A>) {
  return (self: Option<A>): Tuple<[Option<A>, Option<A>]> => self.partition(f)
}
