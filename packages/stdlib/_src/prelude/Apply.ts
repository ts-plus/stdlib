/**
 * @tsplus type Apply
 */
export type Apply<F extends HKT> = AssociativeBoth<F> & Covariant<F>
