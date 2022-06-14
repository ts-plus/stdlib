/**
 * @tsplus static ImmutableQueue/Ops __call
 * @tsplus static ImmutableQueue/Ops make
 */
export function make<As extends any[]>(...values: As): ImmutableQueue<As[number]> {
  return ImmutableQueue.from(values)
}
