/**
 * Boolean `Associative` under conjunction.
 *
 * @tsplus static Associative/Ops all
 */
export const all: Associative<boolean> = Associative((x, y) => x && y)
