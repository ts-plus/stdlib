/**
 * @tsplus operator Maybe |
 * @tsplus fluent Maybe orElse
 */
export function orElse_<A, B>(
  self: Maybe<A>,
  onNone: LazyArg<Maybe<B>>
): Maybe<A | B> {
  return self.isNone() ? onNone() : self
}

/**
 * @tsplus static Maybe/Aspects orElse
 */
export const orElse = Pipeable(orElse_)
