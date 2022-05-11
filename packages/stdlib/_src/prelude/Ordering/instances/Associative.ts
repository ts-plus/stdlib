import * as A from "@tsplus/stdlib/prelude/Associative/definition";

/**
 * `Associative` instance for `Ordering`.
 *
 * @tsplus static Ordering/Ops Associative
 */
export const Associative = A.Associative<Ordering>((x, y) => x !== 0 ? x : y);
