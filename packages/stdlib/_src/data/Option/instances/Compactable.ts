import type * as P from "@tsplus/stdlib/prelude/Compactable"

/**
 * @tsplus static Option/Ops Compactable
 */
export const Compactable = HKT.instance<P.Compactable<Option.HKT>>({
  compact: (option) => option.flatten,
  separate: (option) => option.separate
})
