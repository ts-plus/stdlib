/**
 * @tsplus operator Option |
 * @tsplus fluent Option orElse
 */
export function orElse_<A, B>(
  self: Option<A>,
  onNone: LazyArg<Option<B>>
): Option<A | B> {
  return self.isNone() ? onNone() : self;
}

/**
 * @tsplus static Option/Aspects orElse
 */
export const orElse = Pipeable(orElse_);
