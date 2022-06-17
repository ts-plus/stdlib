const DoF = DSL.getDoF(Maybe.Monad)

/**
 * @tsplus static Maybe/Ops Do
 */
export const Do = DoF.Do

/**
 * @tsplus fluent Maybe bind
 */
export function bind_<Scope, N extends string, E2, A>(
  self: Maybe<Scope>,
  name: N extends keyof Scope ? { error: `binding name '${N}' already in use` } : N,
  f: (_: Scope) => Maybe<A>
): Maybe<{ readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : A }> {
  return DoF.bind(name, f)(self)
}

/**
 * @tsplus static Maybe/Aspects bind
 */
export const bind = DoF.bind

/**
 * @tsplus fluent Maybe bindValue
 */
export function bindValue_<E, Scope, N extends string, B>(
  self: Maybe<Scope>,
  name: N extends keyof Scope ? { error: `binding name '${N}' already in use` } : N,
  f: (_: Scope) => B
): Maybe<{ readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : B }> {
  return DoF.bindValue(name, f)(self)
}

/**
 * @tsplus static Maybe/Aspects bindValue
 */
export const bindValue = DoF.bindValue
