import type * as P from "@tsplus/stdlib/prelude/Compactable"

/**
 * @tsplus static Maybe.Ops Compactable
 */
export const Compactable = HKT.instance<P.Compactable<Maybe.HKT>>({
  compact: (maybe) => maybe.flatten,
  separate: (maybe) => maybe.separate
})
