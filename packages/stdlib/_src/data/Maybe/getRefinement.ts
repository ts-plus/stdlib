/**
 * Returns a `Refinement` (i.e. a custom type guard) from a `Maybe` returning
 * function.
 *
 * This function ensures that a custom type guard definition is type-safe.
 *
 * @tsplus static Maybe/Ops getRefinement
 */
export function getRefinement<A, B extends A>(getMaybe: (a: A) => Maybe<B>): Refinement<A, B> {
  return (a: A): a is B => getMaybe(a).isSome()
}
