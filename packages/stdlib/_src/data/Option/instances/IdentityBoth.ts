/**
 * @tsplus static Option/Ops IdentityBoth
 */
export const OptionIdentityBoth = HKT.instance<IdentityBoth<Option.HKT>>({
  ...Option.Any,
  ...Option.AssociativeBoth
});
