/**
 * @tsplus static Eval.Ops reduce
 */
export function reduce<A, B>(as: Collection<A>, b: LazyArg<B>, f: (b: B, a: A) => Eval<B>): Eval<B> {
  return as.reduce(Eval.succeed(b), (b, a) => b.flatMap((b) => f(b, a)))
}
