/**
 * `AssociativeFlatten` describes a type that can be "flattened" in an
 * associative way.
 *
 * For example, if we have a list of lists of lists, we can flatten it by either
 * flattening the two inner lists and then flattening the resulting lists, or
 * flattening the two outer lists and then flattening that resulting list.
 * Because the operation is associative, the resulting list is the same either
 * way.
 *
 * @tsplus type AssociativeFlatten
 */
export interface AssociativeFlatten<F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    AssociativeFlatten: "AssociativeFlatten"
  }
  readonly flatten: <R, E, A, R2, E2>(
    ffa: HKT.Kind<F, R2, E2, HKT.Kind<F, R, E, A>>
  ) => HKT.Kind<F, R2 & R, E2 | E, A>
}
