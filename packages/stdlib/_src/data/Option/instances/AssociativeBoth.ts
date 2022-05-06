/**
 * @tsplus static Option/Ops AssociativeBoth
 */
export const OptionAssociativeBoth = HKT.instance<AssociativeBoth<Option.HKT>>({
  both: Option.$.zip
});
