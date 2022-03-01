import type { Ordering } from "../Ordering.js"
import { Ord } from "./definition.js"

const compare = (x: any, y: any): Ordering => {
  return x < y ? -1 : x > y ? 1 : 0
}

/**
 * @tsplus static OrdOps boolean
 */
export const boolean: Ord<boolean> = Ord(compare)

/**
 * @tsplus static OrdOps number
 */
export const number: Ord<number> = Ord(compare)

/**
 * @tsplus static OrdOps date
 */
export const date: Ord<Date> = number.contramap((date: Date) => date.valueOf())

/**
 * @tsplus static OrdOps string
 */
export const string: Ord<string> = Ord(compare)
