/**
 * @tsplus type Compactable
 */
export type Compactable<F extends HKT> = Compact<F> & Separate<F>
