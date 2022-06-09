/**
 * @tsplus fluent ImmutableQueue append
 */
export function append_<A>(self: ImmutableQueue<A>, value: A): ImmutableQueue<A> {
  return self.appendAll(List(value))
}

/**
 * @tsplus static ImmutableQueue/Aspects append
 */
export const append = Pipeable(append_)
