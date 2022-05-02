/**
 * Boolean `Associative` under disjunction.
 *
 * @tsplus static Associative/Ops any
 */
export const any: Associative<boolean> = Associative((x, y) => x || y);
