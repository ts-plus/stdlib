/**
 * @tsplus index ImmutableArray
 * @tsplus fluent ImmutableArray get
 */
export function get_<A>(
  self: ImmutableArray<A>,
  index: number
): Maybe<NonNullable<A>> {
  return Maybe.fromNullable(self.array[index])
}

/**
 * @tsplus static ImmutableArray/Aspects get
 */
export const get = Pipeable(get_)
