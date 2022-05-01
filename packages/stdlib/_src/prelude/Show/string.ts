/**
 * @tsplus static Show/Ops string
 */
export const string: Show<string> = Show(
  (a) => JSON.stringify(a)
);
