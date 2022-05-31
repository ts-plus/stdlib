/**
 * Contramap Ord input
 *
 * @tsplus fluent Ord contramap
 */
export function contramap<A, B>(fa: Ord<A>, f: (b: B) => A): Ord<B> {
  return Ord((x, y) => fa.compare(f(x), f(y)))
}

/**
 * Contramap Ord input
 *
 * @tsplus static Ord/Ops from
 */
export function from<A, B>(f: (b: B) => A, /** @tsplus auto */ fa: Ord<A>): Ord<B> {
  return Ord((x, y) => fa.compare(f(x), f(y)))
}

/**
 * Test whether one value is _strictly greater than_ another
 *
 * @tsplus getter Ord gt
 */
export function gt<A>(x: A, y: A, /** @tsplus auto */ O: Ord<A>): boolean {
  return O.compare(x, y) === 1
}

/**
 * Test whether one value is _non-strictly less than_ another
 *
 * @tsplus getter Ord leq
 */
export function leq<A>(x: A, y: A, /** @tsplus auto */ O: Ord<A>): boolean {
  return O.compare(x, y) !== 1
}

/**
 * Test whether one value is _strictly less than_ another
 *
 * @tsplus getter Ord lt
 */
export function lt<A>(x: A, y: A, /** @tsplus auto */ O: Ord<A>): boolean {
  return O.compare(x, y) === -1
}

/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen
 *
 * @tsplus getter Ord max
 */
export function max<A>(x: A, y: A, /** @tsplus auto */ O: Ord<A>): A {
  return O.compare(x, y) === -1 ? y : x
}

/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen
 *
 * @tsplus getter Ord min
 */
export function min<A>(x: A, y: A, /** @tsplus auto */ O: Ord<A>): A {
  return O.compare(x, y) === 1 ? y : x
}

/**
 * Test whether a value is between a minimum and a maximum (inclusive)
 *
 * @tsplus getter Ord between
 */
export function between<A>(x: A, low: A, hi: A, /** @tsplus auto */ O: Ord<A>): boolean {
  return (lt(x, low) || gt(x, hi)) ? false : true
}

/**
 * Clamp a value between a minimum and a maximum
 *
 * @tsplus getter Ord clamp
 */
export function clamp<A>(x: A, low: A, hi: A, /** @tsplus auto */ O: Ord<A>): A {
  return max(min(x, hi), low)
}

/**
 * Get the dual of an Ord
 *
 * @tsplus getter Ord inverted
 */
export function inverted<A>(O: Ord<A>) {
  return Ord<A>((x, y) => O.compare(y, x))
}

/**
 * Get an instance of Equal
 *
 * @tsplus getter Ord equivalence
 */
export function getEquivalence<A>(O: Ord<A>): Equivalence<A> {
  return Equivalence((x, y) => O.compare(x, y) === 0)
}
