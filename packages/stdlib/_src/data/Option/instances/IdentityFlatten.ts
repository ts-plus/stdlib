/**
 * @tsplus static Option/Ops IdentityFlatten
 */
export const OptionIdentityFlatten = HKT.instance<IdentityFlatten<Option.HKT>>({
  ...Option.Any,
  ...Option.AssociativeFlatten
});
