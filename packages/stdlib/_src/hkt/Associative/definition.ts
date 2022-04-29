/**
 * The `Associative<A>` type class describes an associative binary operator for
 * a type `A`. For example, addition for integers, and string concatenation for
 * strings.
 *
 * @tsplus type Associative
 */
export interface Associative<A> extends Closure<A> {
  readonly _Associative: "Associative";
}

/**
 * @tsplus type Associative/Ops
 */
export interface AssociativeOps {}
export const Associative: AssociativeOps = {};

export interface AssociativeF extends HKT {
  readonly type: Associative<this["A"]>;
}
