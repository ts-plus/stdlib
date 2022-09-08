import type { Recursive } from "@tsplus/stdlib/prelude/Recursive/definition"

/**
 * Monadic fold over a datstructure `R` with an algebra `(r: Recursive<Z>) => M<Z>`
 * eventually returning an `M<Z>`
 *
 * @tsplus static Recursive/Aspects foldM
 * @tsplus pipeable Recursive foldM
 */
export function foldM<F extends HKT, M extends HKT, Z, E = unknown, R = unknown>(
  F: ForEach<F> & Covariant<F>,
  M: IdentityBoth<M> & Monad<M>,
  f: Recursive.FnM<F, M, Z, E, R>
) {
  const mapM = F.forEachF(M)
  const chain = DSL.flatMapF(M)
  const go = (term: Recursive<F, E, R>): HKT.Kind<M, R, E, Z> =>
    pipe(
      term.caseValue,
      mapM(go),
      chain(f)
    )

  return (self: Recursive<F, E, R>) => go(self)
}
