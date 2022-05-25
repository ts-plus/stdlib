/**
 * @tsplus type CaseOps
 */
export interface CaseOps {
  of: <A extends Case>() => Case.Constructor<A>
  tagged: <A extends Case & { _tag: string }>(tag: A["_tag"]) => Case.Constructor<A, "_tag">
}

export const Case: CaseOps = {
  of: () =>
    // @ts-expect-error
    (args) => {
      const obj = {
        [Hash.sym]: hashImpl,
        [Equals.sym]: equalsImpl,
        [Copy.sym]: copyImpl
      }
      for (const k of Object.keys(args)) {
        if (typeof args[k] !== "undefined") {
          obj[k] = args[k]
        }
      }
      return obj
    },
  tagged: (tag) =>
    // @ts-expect-error
    (args) => {
      const obj = {
        [Hash.sym]: hashImpl,
        [Equals.sym]: equalsImpl,
        [Copy.sym]: copyImpl,
        _tag: tag
      }
      for (const k of Object.keys(args)) {
        if (typeof args[k] !== "undefined") {
          obj[k] = args[k]
        }
      }
      return obj
    }
}

function copyImpl<A extends Case>(this: A, that: Partial<A>): A {
  const obj = {
    [Hash.sym]: hashImpl,
    [Equals.sym]: equalsImpl,
    [Copy.sym]: copyImpl
  }
  for (const k of Object.keys(this)) {
    if (typeof this[k] !== "undefined") {
      obj[k] = this[k]
    }
  }
  for (const k of Object.keys(that)) {
    if (typeof that[k] !== "undefined") {
      obj[k] = that[k]
    } else {
      delete obj[k]
    }
  }
  // @ts-expect-error
  return obj
}

function equalsImpl<A extends Case>(this: A, that: Partial<A>): boolean {
  const keysA = Object.keys(this)
  const keysB = Object.keys(that)
  if (keysA.length !== keysB.length) {
    return false
  }
  for (const key of keysA) {
    if (!Equals.equals(this[key], that[key])) {
      return false
    }
  }
  return true
}

function hashImpl<A extends Case>(this: A): number {
  return Hash.plainObject(this)
}

/**
 * @tsplus type Case
 */
export interface Case extends Equals, Copy {
}

export declare namespace Case {
  export interface Constructor<A extends Case, T extends keyof A = never> {
    (args: Omit<A, T | keyof (Equals & Copy)>): A
  }
}
