/**
 * Constructs a new `Array`.
 *
 * @tsplus static Array/Ops __call
 * @tsplus static Array/Ops make
 */
export function make<As extends readonly any[]>(...data: As): Array<As[number]> {
  return Array.from(data)
}
