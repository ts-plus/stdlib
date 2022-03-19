import type { Closure } from "@tsplus/stdlib/prelude/Closure/definition"

/**
 * The `Associative[A]` type class describes an associative binary operator
 * for a type `A`. For example, addition for integers, and string
 * concatenation for strings.
 */
export interface Associative<A> extends Closure<A> {
  readonly _Associative: "Associative"
}
