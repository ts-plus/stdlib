/**
 * @tsplus static Option/Ops Covariant
 */
export const OptionCovariant = HKT.instance<Covariant<Option.HKT>>({
  map: Option.$.map
});
