/**
 * String `Associative` under concatenation.
 *
 * @tsplus static Associative/Ops string
 */
export const string: Associative<string> = Associative((x, y) => x + y)
