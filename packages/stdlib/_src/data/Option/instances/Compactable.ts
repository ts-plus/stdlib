/**
 * @tsplus static Option/Ops Compactable
 */
export const OptionCompactable = HKT.instance<Compactable<Option.HKT>>({
  compact: (option) => option.flatten(),
  separate: (option) => option.separate()
});
