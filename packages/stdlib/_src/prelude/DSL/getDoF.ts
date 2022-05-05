export interface DoF<F extends HKT> {
  Do: HKT.Kind<F, unknown, never, {}>;
  bind: <N extends string, R, E, A, Scope>(
    name: N extends keyof Scope ? { error: `binding name '${N}' already in use`; } : N,
    fn: (_: Scope) => HKT.Kind<F, R, E, A>
  ) => <R0, E0>(
    self: HKT.Kind<F, R0, E0, Scope>
  ) => HKT.Kind<
    F,
    R & R0,
    E | E0,
    {
      readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : A;
    }
  >;
  bindValue: <N extends string, B, Scope>(
    name: N extends keyof Scope ? { error: `binding name '${N}' already in use`; } : N,
    fn: (_: Scope) => B
  ) => <R, E>(
    self: HKT.Kind<F, R, E, Scope>
  ) => HKT.Kind<
    F,
    R,
    E,
    {
      readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : B;
    }
  >;
}

/**
 * @tsplus static DSL getDoF
 */
export function getDoF<F extends HKT>(F: Monad<F>): DoF<F> {
  return {
    Do: DSL.succeedF(F)({}),
    bind: <N extends string, R, E, A, Scope>(
      name: N extends keyof Scope ? { error: `binding name '${N}' already in use`; }
        : N,
      f: (_: Scope) => HKT.Kind<F, R, E, A>
    ) =>
      <R0, E0>(self: HKT.Kind<F, R0, E0, Scope>): HKT.Kind<
        F,
        R & R0,
        E | E0,
        {
          readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : A;
        }
      > =>
        DSL.flatMapF_(F)(self, (scope) =>
          F.map((a: A) => ({ ...scope, [name as string]: a } as {
            readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k]
              : A;
          }))(f(scope))),
    bindValue: <N extends string, B, Scope>(
      name: N extends keyof Scope ? { error: `binding name '${N}' already in use`; }
        : N,
      f: (_: Scope) => B
    ) =>
      <R, E>(
        self: HKT.Kind<F, R, E, Scope>
      ): HKT.Kind<
        F,
        R,
        E,
        {
          readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : B;
        }
      > =>
        F.map((k: Scope) =>
          Object.assign(
            {},
            k,
            { [name as string]: f(k) } as {
              readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : B;
            }
          )
        )(self)
  };
}
