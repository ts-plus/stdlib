/**
 * @tsplus static Either/Ops ForEach
 */
export const EitherForEach = HKT.instance<ForEach<Either.HKT>>({
  ...Either.Covariant,
  forEachF: Either.forEachF
});
