/**
 * @tsplus static Either/Ops FoldMap
 */
export const EitherFoldMap = HKT.instance<FoldMap<Either.HKT>>({
  foldMap: Either.$.foldMap
});
