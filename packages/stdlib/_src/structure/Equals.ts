/**
 * @tsplus type EqualsOps
 */
export interface EqualsOps {
  readonly sym: unique symbol;
}

export const Equals: EqualsOps = {
  sym: Symbol.for("tsplus/Equals") as EqualsOps["sym"]
};

/**
 * @tsplus type Equals
 */
export interface Equals extends Hash {
  [Equals.sym](this: this, other: unknown): boolean;
}

/**
 * @tsplus static EqualsOps isEquals
 */
export function isEquals(u: unknown): u is Equals {
  return Hash.isHash(u) && Equals.sym in u;
}

/**
 * @tsplus static EqualsOps sameValueZeroEqual
 */
export function sameValueZeroEqual(a: any, b: any) {
  return a === b || (a !== a && b !== b);
}

/**
 * @tsplus static EqualsOps equals
 * @tsplus fluent Equals equals
 * @tsplus operator Equals ==
 */
export function equals<A>(a: A, b: A): boolean;
export function equals<A, B>(a: A, b: B): boolean;
export function equals(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true;
  }
  if (!sameValueZeroEqual(Hash.unknown(a), Hash.unknown(b))) {
    return false;
  } else if (isEquals(a)) {
    return a[Equals.sym](b);
  } else if (isEquals(b)) {
    return b[Equals.sym](a);
  }
  return sameValueZeroEqual(a, b);
}
