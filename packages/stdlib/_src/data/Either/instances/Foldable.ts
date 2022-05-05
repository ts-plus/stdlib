/**
 * @tsplus static Either/Ops Foldable
 */
export const EitherFoldable = HKT.instance<Foldable<Either.HKT>>({
  ...Either.FoldMap,
  ...Either.Reduce,
  ...Either.ReduceRight
});
