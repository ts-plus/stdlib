/**
 * `Ord<A>` provides implicit evidence that values of type `A` have a total
 * ordering.
 *
 * @tsplus type Ord
 */
export interface Ord<A> {
  readonly Law: { readonly Ord: "Ord"; };
  readonly compare: (x: A, y: A) => Ordering;
}

/**
 * @tsplus type OrdOps
 */
export interface OrdOps {
  <A>(compare: (x: A, y: A) => Ordering): Ord<A>;
}
export const Ord: OrdOps = <A>(compare: (x: A, y: A) => Ordering): Ord<A> => HKT.instance({ compare });
