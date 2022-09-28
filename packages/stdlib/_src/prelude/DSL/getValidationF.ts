// TODO(Mike/Max): naming conflict with Validation from runtime module
/**
 * @tsplus type Validation
 */
export interface Validation<F extends HKT, E> extends HKT {
  readonly type: HKT.Kind<F, this["R"], E, this["A"]>
}

/**
 * @tsplus static DSL getValidationF
 */
export function getValidationF<F extends HKT>(M: Monad<F> & Run<F> & Fail<F> & Applicative<F>) {
  return <Z>(S: Associative<Z>): Applicative<Validation<F, Z>> =>
    HKT.instance({
      any: M.any,
      map: M.map,
      both: <B, R2 = unknown>(fb: HKT.Kind<F, R2, Z, B>) =>
        <A, R = unknown>(fa: HKT.Kind<F, R, Z, A>) => {
          const both = M.both(M.either(fb))(M.either(fa))
          return M.flatten(
            M.map(([eitherA, eitherB]: readonly [Either<Z, A>, Either<Z, B>]) =>
              eitherA.fold(
                (ea) =>
                  eitherB.fold(
                    (eb) => M.fail(S.combine(ea, eb)),
                    () => M.fail(ea)
                  ),
                (a) =>
                  eitherB.fold(
                    (e) => M.fail(e),
                    (b) => DSL.succeedF(M)([a, b] as const)
                  )
              )
            )(both)
          )
        }
    })
}
