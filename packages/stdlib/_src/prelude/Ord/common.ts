const compare = (x: any, y: any): Ordering => {
  return x < y ? -1 : x > y ? 1 : 0;
};

/**
 * @tsplus static OrdOps boolean
 * @tsplus implicit
 */
export const boolean: Ord<boolean> = Ord(compare);

/**
 * @tsplus static OrdOps number
 * @tsplus implicit
 */
export const number: Ord<number> = Ord(compare);

/**
 * @tsplus static OrdOps date
 * @tsplus implicit
 */
export const date: Ord<Date> = number.contramap((date: Date) => date.valueOf());

/**
 * @tsplus static OrdOps string
 * @tsplus implicit
 */
export const string: Ord<string> = Ord(compare);
