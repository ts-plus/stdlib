/**
 * @tsplus static Option/Ops ForEach
 */
export const OptionForEach = HKT.instance<ForEach<Option.HKT>>({
  ...Option.Covariant,
  forEachF: Option.forEachF
});
