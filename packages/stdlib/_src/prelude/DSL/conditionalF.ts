/**
 * @tsplus static DSL conditionalF_
 */
export function conditionalF_<F extends HKT>() {
  return <X extends HKT.Kind<F, any, any, any>, Y extends HKT.Kind<F, any, any, any>>(
    predicate: boolean,
    onTrue: LazyArg<X>,
    onFalse: LazyArg<Y>
  ): HKT.Kind<
    F,
    HKT.Infer<F, "R", X | Y>,
    HKT.Infer<F, "E", X | Y>,
    HKT.Infer<F, "A", X | Y>
  > => (predicate ? onTrue() : onFalse());
}

/**
 * @tsplus static DSL conditionalF
 */
export function conditionalF<F extends HKT>() {
  return <X extends HKT.Kind<F, any, any, any>, Y extends HKT.Kind<F, any, any, any>>(
    onTrue: LazyArg<X>,
    onFalse: LazyArg<Y>
  ): ((
    predicate: boolean
  ) => HKT.Kind<
    F,
    HKT.Infer<F, "R", X | Y>,
    HKT.Infer<F, "E", X | Y>,
    HKT.Infer<F, "A", X | Y>
  >) => (b) => b ? onTrue() : onFalse();
}
