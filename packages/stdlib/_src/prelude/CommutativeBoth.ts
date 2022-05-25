/**
 * An commutative binary operator that combines two values of types `F<A>`
 * and `F<B>` to produce an `F<Tuple<[A, B]>>`.
 *
 * @tsplus type CommutativeBoth
 */
export type CommutativeBoth<F extends HKT> = {
  readonly Law: {
    readonly CommutativeBoth: "CommutativeBoth"
  }
} & AssociativeBoth<F>
