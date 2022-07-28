/**
 * Like chain but ignores the constructed outout.
 *
 * @tsplus static Maybe.Aspects tap
 * @tsplus pipeable Maybe tap
 */
export function tap<A>(f: (a: A) => Maybe<any>) {
  return (self: Maybe<A>): Maybe<A> => self.flatMap((a) => f(a).map(() => a))
}
