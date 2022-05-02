/**
 * Returns a `Associative` instance for objects preserving their type.
 *
 * @tsplus static Associative/Ops object
 */
export function object<A extends object>(): Associative<A> {
  return Associative((x, y) => Object.assign({}, x, y));
}
