/**
 * @tsplus type Partition
 */
export interface Partition<F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly Partition: "Partition"
  }
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): <R, E>(
      fa: HKT.Kind<F, R, E, A>
    ) => readonly [HKT.Kind<F, R, E, A>, HKT.Kind<F, R, E, B>]
    <A>(predicate: Predicate<A>): <R, E>(
      fa: HKT.Kind<F, R, E, A>
    ) => readonly [HKT.Kind<F, R, E, A>, HKT.Kind<F, R, E, A>]
  }
}
