const compare = (x: any, y: any): Ordering => {
  return x < y ? -1 : x > y ? 1 : 0
}

/**
 * @tsplus static Ord/Ops boolean
 * @tsplus implicit
 */
export const boolean: Ord<boolean> = Ord(compare)

/**
 * @tsplus static Ord/Ops number
 * @tsplus implicit
 */
export const number: Ord<number> = Ord(compare)

/**
 * @tsplus static Ord/Ops date
 * @tsplus implicit
 */
export const date: Ord<Date> = Ord.from((date: Date) => date.valueOf())

/**
 * @tsplus static Ord/Ops string
 * @tsplus implicit
 */
export const string: Ord<string> = Ord(compare)
