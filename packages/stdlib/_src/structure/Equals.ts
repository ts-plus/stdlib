/**
 * @tsplus type Equals.Ops
 */
export interface EqualsOps {
  readonly sym: unique symbol
}

export const Equals: EqualsOps = {
  sym: Symbol.for("tsplus/Equals") as EqualsOps["sym"]
}

/**
 * @tsplus type Equals
 */
export interface Equals extends Hash {
  [Equals.sym](this: this, other: unknown): boolean
}

/**
 * @tsplus static Equals.Ops isEquals
 */
export function isEquals(u: unknown): u is Equals {
  return Hash.isHash(u) && Equals.sym in u
}

/**
 * @tsplus static Equals.Ops sameValueZeroEqual
 */
export function sameValueZeroEqual(a: any, b: any) {
  return a === b || (a !== a && b !== b)
}

const protoMap = new Map<any, (a: any, b: any) => boolean>([
  [
    Array.prototype,
    (a: Array<any>, b: Array<any>) => a.length === b.length && a.every((v, i) => equals(v, b[i]))
  ],
  [
    Set.prototype,
    (a: Set<any>, b: Set<any>) => {
      if (a.size !== b.size) {
        return false
      }
      for (const va of a.values()) {
        let found = false
        for (const vb of b.values()) {
          if (equals(va, vb)) {
            found = true
            break
          }
        }
        if (!found) {
          return false
        }
      }
      return true
    }
  ],
  [
    Object.prototype,
    (a: object, b: object) => {
      if ("_tag" in a) {
        if ("_tag" in b) {
          if (a["_tag"] !== b["_tag"]) {
            return false
          }
        } else {
          return false
        }
      }
      const keysA = Object.keys(a).sort()
      const keysB = Object.keys(b).sort()
      if (keysA.length !== keysB.length) {
        return false
      }
      if (!equals(keysA, keysB)) {
        return false
      }
      for (const ka of keysA) {
        const va = a[ka]
        const vb = b[ka]
        if (!equals(va, vb)) {
          return false
        }
      }
      return true
    }
  ],
  [
    Map.prototype,
    (a: Map<any, any>, b: Map<any, any>) => {
      if (a.size !== b.size) {
        return false
      }
      for (const [ka, va] of a.entries()) {
        let found = false
        for (const [kb, vb] of b.entries()) {
          if (equals(ka, kb) && equals(va, vb)) {
            found = true
            break
          }
        }
        if (!found) {
          return false
        }
      }
      return true
    }
  ]
])

/**
 * @tsplus static Equals.Ops equals
 * @tsplus fluent Equals equals
 * @tsplus operator Equals ==
 */
export function equals<A>(a: A, b: A): boolean
export function equals<A, B>(a: A, b: B): boolean
export function equals(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true
  }
  if (isEquals(a)) {
    if (!isEquals(b)) {
      return false
    }
    if (!sameValueZeroEqual(Hash.unknown(a), Hash.unknown(b))) {
      return false
    }
    return a[Equals.sym](b)
  }
  if (typeof a === "object" && typeof b === "object") {
    const protoA = Object.getPrototypeOf(a)
    const protoB = Object.getPrototypeOf(b)
    if (protoA === protoB) {
      const compare = protoMap.get(protoA)
      if (compare) {
        return compare(a, b)
      }
    }
  }
  return sameValueZeroEqual(a, b)
}
