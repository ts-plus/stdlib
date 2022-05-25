/**
 * @tsplus static Show/Ops boolean
 */
export const boolean: Show<boolean> = Show(
  (a) => JSON.stringify(a)
)
