/**
 * The `Associative<A>` type class describes an associative binary operator
 * for a type `A`. For example, addition for integers, and string
 * concatenation for strings.
 *
 * @tsplus type Associative
 */
export interface Associative<A> extends Closure<A> {
  readonly Law: Closure<A>["Law"] & { readonly Associative: "Associative" }
}

/**
 * @tsplus type Associative/Ops
 */
export interface AssociativeOps {
  <A>(combine: (x: A, y: A) => A): Associative<A>
}
export const Associative: AssociativeOps = <A>(combine: (x: A, y: A) => A): Associative<A> => HKT.instance({ combine })
