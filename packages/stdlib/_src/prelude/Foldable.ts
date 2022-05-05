/**
 * @tsplus type Foldable
 */
export type Foldable<F extends HKT> = ReduceRight<F> & Reduce<F> & FoldMap<F>;
