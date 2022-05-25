/**
 * `Associative` for function combination.
 *
 * @tsplus static Associative/Ops function
 */
export function function_<S>(S: Associative<S>): <A>() => Associative<(a: A) => S> {
  return () => Associative((f, g) => (a) => S.combine(f(a), g(a)))
}

export { function_ as function }
