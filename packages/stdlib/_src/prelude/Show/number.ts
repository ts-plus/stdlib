/**
 * @tsplus static Show/Ops number
 */
export const number: Show<number> = Show(
  (a) => JSON.stringify(a)
)
