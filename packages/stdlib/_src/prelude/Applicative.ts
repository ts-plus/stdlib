/**
 * @tsplus type Applicative
 */
export type Applicative<F extends HKT> = IdentityBoth<F> & Covariant<F>
