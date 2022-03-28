/**
 * Equivalent to a Monoid
 */
export interface AssociativeIdentity<A> extends Associative<A> {
  readonly identity: A;
}
