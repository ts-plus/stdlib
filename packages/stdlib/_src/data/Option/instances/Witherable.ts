/**
 * @tsplus static Option/Ops Witherable
 */
export const OptionWitherable = HKT.instance<Witherable<Option.HKT>>({
  compactF: Option.compactF
});
