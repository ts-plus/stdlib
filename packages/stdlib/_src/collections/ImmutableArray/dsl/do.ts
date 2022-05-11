const DoF = DSL.getDoF(ImmutableArray.Monad);

/**
 * @tsplus static ImmutableArray/Ops Do
 */
export const Do = DoF.Do;

/**
 * @tsplus fluent ImmutableArray bind
 */
export function bind_<Scope, N extends string, A>(
  self: ImmutableArray<Scope>,
  name: N extends keyof Scope ? { error: `binding name '${N}' already in use`; } : N,
  f: (_: Scope) => ImmutableArray<A>
): ImmutableArray<{ readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : A; }> {
  return DoF.bind(name, f)(self);
}

/**
 * @tsplus static ImmutableArray/Aspects bind
 */
export const bind = DoF.bind;

/**
 * @tsplus fluent ImmutableArray bindValue
 */
export function bindValue_<Scope, N extends string, B>(
  self: ImmutableArray<Scope>,
  name: N extends keyof Scope ? { error: `binding name '${N}' already in use`; } : N,
  f: (_: Scope) => B
): ImmutableArray<{ readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : B; }> {
  return DoF.bindValue(name, f)(self);
}

/**
 * @tsplus static ImmutableArray/Aspects bindValue
 */
export const bindValue = DoF.bindValue;
