/**
 * @tsplus static Option/Ops Extend
 */
export const OptionExtend = HKT.instance<Extend<Option.HKT>>({
  extend: Option.$.extend
});
