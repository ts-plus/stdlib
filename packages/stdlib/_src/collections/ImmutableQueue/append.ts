/**
 * @tsplus static ImmutableQueue.Aspects append
 * @tsplus pipeable ImmutableQueue append
 */
export function append<A>(value: A) {
  return (self: ImmutableQueue<A>): ImmutableQueue<A> => self.appendAll(List(value))
}
