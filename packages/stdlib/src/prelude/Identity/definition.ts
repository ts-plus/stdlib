import type { Associative } from "../Associative/definition.js"

/**
 * Equivalent to a Monoid
 */
export interface Identity<A> extends Associative<A> {
  readonly identity: A
}
