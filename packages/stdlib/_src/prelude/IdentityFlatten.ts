/**
 * `IdentityFlatten` described a type that can be "flattened" in an
 * associative way and has an identity element with respect to that operation.
 *
 * For example, with a list we can always vacuously add a layer by wrapping a
 * list in another list constructor and flattening the resulting list always
 * returns the original list unchanged.
 *
 * @tsplus type IdentityFlatten
 */
export type IdentityFlatten<F extends HKT> = AssociativeFlatten<F> & Any<F>;
