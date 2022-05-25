/**
 * Given a tuple of `Associative`s, returns an `Associative` for the tuple.
 *
 * @tsplus static Associative/Ops tuple
 */
export function tuple<T extends ReadonlyArray<Associative<any>>>(
  ...associatives: T
): Associative<{ [K in keyof T]: T[K] extends Associative<infer A> ? A : never }> {
  return Associative(
    (x, y) => associatives.map((s, i) => s.combine(x[i], y[i])) as any
  )
}
