const DoF = DSL.getDoF<Either.HKT>(Either.Monad);

/**
 * @tsplus static Either/Ops Do
 */
export const Do = DoF.Do;

/**
 * @tsplus fluent Either bind
 */
export function bind_<E, Scope, N extends string, E2, A>(
  self: Either<E, Scope>,
  name: N extends keyof Scope ? { error: `binding name '${N}' already in use`; } : N,
  f: (_: Scope) => Either<E2, A>
): Either<E | E2, { readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : A; }> {
  return DoF.bind(name, f)(self);
}

/**
 * @tsplus static Either/Aspects bind
 */
export const bind = DoF.bind;

/**
 * @tsplus fluent Either bindValue
 */
export function bindValue_<E, Scope, N extends string, B>(
  self: Either<E, Scope>,
  name: N extends keyof Scope ? { error: `binding name '${N}' already in use`; } : N,
  f: (_: Scope) => B
): Either<E, { readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : B; }> {
  return DoF.bindValue(name, f)(self);
}

/**
 * @tsplus static Either/Aspects bindValue
 */
export const bindValue = DoF.bindValue;
