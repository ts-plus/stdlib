const DoF = DSL.getDoF<Either.HKT>(Either.Monad)

/**
 * @tsplus static Either.Ops Do
 */
export const Do = DoF.Do

/**
 * @tsplus static Either.Aspects bind
 * @tsplus pipeable Either bind
 */
export function bind<N extends string, Scope, E2, A>(
  name: N extends keyof Scope ? { error: `binding name '${N}' already in use` } : N,
  f: (_: Scope) => Either<E2, A>
) {
  return <E>(
    self: Either<E, Scope>
  ): Either<E | E2, { readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : A }> =>
    DoF.bind(name, f)(self)
}

/**
 * @tsplus static Either.Aspects bindValue
 * @tsplus pipeable Either bindValue
 */
export function bindValue<N extends string, Scope, B>(
  name: N extends keyof Scope ? { error: `binding name '${N}' already in use` } : N,
  f: (_: Scope) => B
) {
  return <E>(
    self: Either<E, Scope>
  ): Either<E, { readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : B }> =>
    DoF.bindValue(name, f)(self)
}
