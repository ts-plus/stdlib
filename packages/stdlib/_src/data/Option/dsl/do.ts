const DoF = Prelude.getDoF(Option.Monad)

/**
 * @tsplus static Option/Ops Do
 */
export const Do = DoF.Do

/**
 * @tsplus fluent Option bind
 */
export function bind_<Scope, N extends string, E2, A>(
  self: Option<Scope>,
  name: N extends keyof Scope ? { error: `binding name '${N}' already in use` } : N,
  f: (_: Scope) => Option<A>
): Option<{ readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : A }> {
  return DoF.bind(name, f)(self)
}

/**
 * @tsplus static Option/Aspects bind
 */
export const bind = DoF.bind

/**
 * @tsplus fluent Option bindValue
 */
export function bindValue_<E, Scope, N extends string, B>(
  self: Option<Scope>,
  name: N extends keyof Scope ? { error: `binding name '${N}' already in use` } : N,
  f: (_: Scope) => B
): Option<{ readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : B }> {
  return DoF.bindValue(name, f)(self)
}

/**
 * @tsplus static Option/Aspects bindValue
 */
export const bindValue = DoF.bindValue
