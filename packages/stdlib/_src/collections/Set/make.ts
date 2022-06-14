/**
 * Constructs a new `Set`.
 *
 * @tsplus static Set/Ops __call
 * @tsplus static Set/Ops make
 */
export function make<As extends readonly any[]>(...data: As): Set<As[number]> {
  return Set.from(data)
}
