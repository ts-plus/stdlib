/**
 * Compact types Either<E, A> | Either<E2, B> = Either<E | E2, A | B>
 *
 * @tsplus static Either/Ops compact
 * @tsplus macro identity
 */
export function compact<E extends Either<any, any>>(
  _: E
): [E] extends [Either<infer L, infer R>] ? Either<L, R> : E {
  return _ as any
}
