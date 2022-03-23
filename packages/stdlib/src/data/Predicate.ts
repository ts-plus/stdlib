/**
 * @tsplus type Predicate
 */
export interface Predicate<A> {
  (a: A): boolean;
}

/**
 * Inverts a boolean predicate
 */
export function not<A>(predicate: Predicate<A>): Predicate<A> {
  return (a) => !predicate(a);
}
