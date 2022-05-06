/**
 * @tsplus static Option/Ops Any
 */
export const OptionAny = HKT.instance<Any<Option.HKT>>({
  any: () => Option.some({})
});
