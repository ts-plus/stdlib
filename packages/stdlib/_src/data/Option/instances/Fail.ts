/**
 * @tsplus static Option/Ops Fail
 */
export const OptionFail = HKT.instance<Fail<Option.HKT>>({
  fail: () => Option.none
});
