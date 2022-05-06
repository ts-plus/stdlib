/**
 * @tsplus static Option/Ops AssociativeFlatten
 */
export const OptionAssociativeFlatten = HKT.instance<AssociativeFlatten<Option.HKT>>({
  flatten: (option) => option.flatten()
});
