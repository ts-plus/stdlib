/**
 * Use `A => B` to transform `Option<A>` to `Option<B>`.
 *
 * @tsplus fluent Option map
 */
export function map_<A, B>(self: Option<A>, f: (a: A) => B): Option<B> {
  return self.isNone() ? Option.none : Option.some(f(self.value));
}

/**
 * @tsplus static Option/Aspects map
 */
export const map = Pipeable(map_);
