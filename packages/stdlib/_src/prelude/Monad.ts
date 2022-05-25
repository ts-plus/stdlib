/**
 * @tsplus type Monad
 */
export type Monad<F extends HKT> = IdentityFlatten<F> & Covariant<F>
