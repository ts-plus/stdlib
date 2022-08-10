const DoF = DSL.getDoF(Maybe.Monad)

/**
 * @tsplus static Maybe.Ops Do
 */
export const Do = DoF.Do

/**
 * @tsplus static Maybe.Aspects bind
 * @tsplus pipeable Maybe bind
 */
export function bind<N extends string, Scope, A>(
  name: N extends keyof Scope ? { error: `binding name '${N}' already in use` } : N,
  f: (_: Scope) => Maybe<A>
) {
  return (
    self: Maybe<Scope>
  ): Maybe<{ readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : A }> =>
    DoF.bind(name, f)(self)
}

/**
 * @tsplus static Maybe.Aspects bindValue
 * @tsplus pipeable Maybe bindValue
 */
export function bindValue<N extends string, Scope, B>(
  name: N extends keyof Scope ? { error: `binding name '${N}' already in use` } : N,
  f: (_: Scope) => B
) {
  return (
    self: Maybe<Scope>
  ): Maybe<{ readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : B }> =>
    DoF.bindValue(name, f)(self)
}
