/**
 * Returns a `Refinement` (i.e. a custom type guard) from a `Option` returning
 * function.
 *
 * This function ensures that a custom type guard definition is type-safe.
 *
 * @tsplus static Option/Ops getRefinement
 */
export function getRefinement<A, B extends A>(getOption: (a: A) => Option<B>): Refinement<A, B> {
  return (a: A): a is B => getOption(a).isSome()
}
