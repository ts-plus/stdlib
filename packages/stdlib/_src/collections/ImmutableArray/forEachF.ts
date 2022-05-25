/**
 * @tsplus static ImmutableArray/Ops forEachF
 */
export const forEachF: ForEach.Fn<ImmutableArray.HKT> = (G) =>
  (f) => ImmutableArray.forEachWithIndexF(G)((_, a) => f(a))
