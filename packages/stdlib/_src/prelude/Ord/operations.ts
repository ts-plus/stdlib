import { Equivalence } from "@tsplus/stdlib/prelude/Equivalence";
import { Ord } from "@tsplus/stdlib/prelude/Ord/definition";
import type { Ordering } from "@tsplus/stdlib/prelude/Ordering";

/**
 * Creates Ord[A] from a compare function
 *
 * @tsplus static OrdOps make
 * @tsplus static OrdOps __call
 */
export function makeOrd<A>(compare: (x: A, y: A) => Ordering): Ord<A> {
  return {
    compare
  };
}

/**
 * Contramap Ord input
 *
 * @tsplus fluent Ord contramap
 */
export function contramap<A, B>(fa: Ord<A>, f: (b: B) => A): Ord<B> {
  return Ord((x, y) => fa.compare(f(x), f(y)));
}

/**
 * Test whether one value is _strictly greater than_ another
 *
 * @tsplus getter Ord gt
 */
export function gt<A>(O: Ord<A>): (x: A, y: A) => boolean {
  return (x, y) => O.compare(x, y) === 1;
}

/**
 * Test whether one value is _non-strictly less than_ another
 *
 * @tsplus getter Ord leq
 */
export function leq<A>(O: Ord<A>): (x: A, y: A) => boolean {
  return (x, y) => O.compare(x, y) !== 1;
}

/**
 * Test whether one value is _strictly less than_ another
 *
 * @tsplus getter Ord lt
 */
export function lt<A>(O: Ord<A>): (x: A, y: A) => boolean {
  return (x, y) => O.compare(x, y) === -1;
}

/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen
 *
 * @tsplus getter Ord max
 */
export function max<A>(O: Ord<A>): (x: A, y: A) => A {
  return (x, y) => (O.compare(x, y) === -1 ? y : x);
}

/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen
 *
 * @tsplus getter Ord min
 */
export function min<A>(O: Ord<A>): (x: A, y: A) => A {
  return (x, y) => (O.compare(x, y) === 1 ? y : x);
}

/**
 * Test whether a value is between a minimum and a maximum (inclusive)
 *
 * @tsplus getter Ord between
 */
export function between<A>(O: Ord<A>): (low: A, hi: A) => (x: A) => boolean {
  const lessThanO = lt(O);
  const greaterThanO = gt(O);
  return (low, hi) => (x) => lessThanO(x, low) || greaterThanO(x, hi) ? false : true;
}

/**
 * Clamp a value between a minimum and a maximum
 *
 * @tsplus getter Ord clamp
 */
export function clamp<A>(O: Ord<A>): (low: A, hi: A) => (x: A) => A {
  const minO = min(O);
  const maxO = max(O);
  return (low, hi) => (x) => maxO(minO(x, hi), low);
}

/**
 * Get the dual of an Ord
 *
 * @tsplus getter Ord inverted
 */
export function inverted<A>(O: Ord<A>) {
  return Ord<A>((x, y) => O.compare(y, x));
}

/**
 * Get an instance of Equal
 *
 * @tsplus getter Ord equivalence
 */
export function getEquivalence<A>(O: Ord<A>): Equivalence<A> {
  return Equivalence((x, y) => O.compare(x, y) === 0);
}
