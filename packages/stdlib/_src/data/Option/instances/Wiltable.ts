/**
 * @tsplus static Option/Ops Wiltable
 */
export const OptionWiltable = HKT.instance<Wiltable<Option.HKT>>({
  separateF: Option.separateF
});
