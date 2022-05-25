/**
 * @tsplus static DSL getApplicativeF
 */
export function getApplicativeF<F extends HKT>(F: Monad<F>): Applicative<F> {
  const Apply = DSL.getApplyF(F)
  return HKT.instance({
    ...Apply,
    any: F.any
  })
}
