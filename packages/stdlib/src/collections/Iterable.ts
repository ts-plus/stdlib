import { Tuple } from "../data/Tuple/definition.js"
import type { Identity } from "../prelude/Identity.js"
import type { ESIterable } from "../utilities/Types.js"

declare global {
  /**
   * @tsplus type Iterable
   */
  export interface Iterable<T> {}
}

export type Iterable<A> = ESIterable<A>

/**
 * @tsplus type IterableOps
 */
export interface IterableOps {}
export const Iterable: IterableOps = {}

function* genOf<A>(a: A) {
  yield a
}

function* genMap<A, B>(iterator: Iterator<A>, mapping: (a: A, i: number) => B) {
  let n = -1
  while (true) {
    const result = iterator.next()
    if (result.done) {
      break
    }
    n += 1
    yield mapping(result.value, n)
  }
}

function* genChain<A, B>(iterator: Iterator<A>, mapping: (a: A) => Iterable<B>) {
  while (true) {
    const result = iterator.next()
    if (result.done) {
      break
    }
    const ib = mapping(result.value)[Symbol.iterator]()
    while (true) {
      const result = ib.next()
      if (result.done) {
        break
      }
      yield result.value
    }
  }
}

/**
 * @tsplus fluent Iterable zipWith
 */
export function zipWith<A, B, C>(
  self: Iterable<A>,
  that: Iterable<B>,
  zipper: (a: A, b: B) => C
): Iterable<C> {
  // inspired from "Closing Iterables is a Leaky Abstraction" by Reginald Braithwaite
  // https://raganwald.com/2017/07/22/closing-iterables-is-a-leaky-abstraction.html
  return {
    [Symbol.iterator]() {
      let done = false
      const ia = self[Symbol.iterator]()
      const ib = that[Symbol.iterator]()
      return {
        next() {
          if (done) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return this.return!()
          }

          const va = ia.next()
          const vb = ib.next()

          return va.done || vb.done
            ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              this.return!()
            : { done: false, value: zipper(va.value, vb.value) }
        },
        return(value?: unknown) {
          if (!done) {
            done = true

            if (typeof ia.return === "function") {
              ia.return()
            }
            if (typeof ib.return === "function") {
              ib.return()
            }
          }

          return { done: true, value }
        }
      }
    }
  }
}

/**
 * @tsplus fluent Iterable map
 */
export function map_<A, B>(i: Iterable<A>, f: (a: A, k: number) => B): Iterable<B> {
  return {
    [Symbol.iterator]: () => genMap(i[Symbol.iterator](), f)
  }
}

export const map = Pipeable(map_)

/**
 * @tsplus fluent Iterable zip
 */
export function zip_<A, B>(fa: Iterable<A>, fb: Iterable<B>): Iterable<Tuple<[A, B]>> {
  return zipWith(fa, fb, Tuple.make)
}

export const zip = Pipeable(zip_)

/**
 * @tsplus fluent Iterable chain
 */
export function chain_<A, B>(i: Iterable<A>, f: (a: A) => Iterable<B>): Iterable<B> {
  return {
    [Symbol.iterator]: () => genChain(i[Symbol.iterator](), f)
  }
}

export const chain = Pipeable(chain_)

/**
 * @tsplus fluent Iterable ap
 */
export function ap_<A, B>(fab: Iterable<(a: A) => B>, fa: Iterable<A>): Iterable<B> {
  return chain_(fab, (f) => map_(fa, f))
}

export const ap = Pipeable(ap_)

/**
 * @tsplus static IterableOps of
 */
export function of<A>(a: A): Iterable<A> {
  return {
    [Symbol.iterator]: () => genOf(a)
  }
}

/**
 * @tsplus fluent Iterable take
 */
export function take_<A>(a: Iterable<A>, n: number): Iterable<A> {
  return {
    *[Symbol.iterator]() {
      let i = 0
      for (const x of a) {
        if (i++ >= n) {
          return
        }
        yield x
      }
    }
  }
}

export const take = Pipeable(take_)

/**
 * @tsplus fluent Iterable skip
 */
export function skip_<A>(a: Iterable<A>, n: number): Iterable<A> {
  return {
    *[Symbol.iterator]() {
      let i = 0
      for (const x of a) {
        if (i++ >= n) {
          yield x
        }
      }
    }
  }
}

export const skip = Pipeable(skip_)

/**
 * @tsplus static IterableOps never
 */
export const never: Iterable<never> = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  *[Symbol.iterator]() {}
}

/**
 * @tsplus fluent Iterable foldMap
 */
export function foldMap_<M, A>(
  self: Iterable<A>,
  M: Identity<M>,
  f: (a: A, k: number) => M
): M {
  let res = M.identity
  let n = -1
  const iterator = self[Symbol.iterator]()
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const result = iterator.next()
    if (result.done) {
      break
    }
    n += 1
    res = M.combine(res, f(result.value, n))
  }
  return res
}

export const foldMap = Pipeable(foldMap_)

/**
 * @tsplus fluent Iterable reduce
 */
export function reduce_<A, B>(
  self: Iterable<A>,
  b: B,
  f: (b: B, a: A, i: number) => B
): B {
  let res = b
  let n = -1
  const iterator = self[Symbol.iterator]()
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const result = iterator.next()
    if (result.done) {
      break
    }
    n += 1
    res = f(res, result.value, n)
  }
  return res
}

export const reduce = Pipeable(reduce_)

// export function reduceRight<A, B>(b: B, f: (a: A, b: B, i: number) => B) {
//   return (fa: Iterable<A>): B => {
//     return A.reduceRightWithIndex_(Array.from(fa), b, (i, a, b) => f(a, b, i))
//   }
// }
//
// export function reduceRight_<A, B>(
//   fa: Iterable<A>,
//   b: B,
//   f: (a: A, b: B, i: number) => B
// ): B {
//   return A.reduceRightWithIndex_(Array.from(fa), b, (i, a, b) => f(a, b, i))
// }

/**
 * @tsplus fluent Iterable concat
 */
export function concat_<A>(self: Iterable<A>, that: Iterable<A>): Iterable<A> {
  return {
    *[Symbol.iterator]() {
      for (const x of self) {
        yield x
      }
      for (const x of that) {
        yield x
      }
    }
  }
}

export const concat = Pipeable(concat_)

/**
 * @tsplus fluent Iterable flatten
 */
export function flatten<A>(a: Iterable<Iterable<A>>) {
  return chain_(a, (x) => x)
}

// export function partitionMap<A, A1, A2>(f: (a: A) => Either<A1, A2>) {
//   return (as: Iterable<A>): Tp.Tuple<[Iterable<A1>, Iterable<A2>]> =>
//     A.separate(Array.from(map_(as, f)))
// }

/**
 * Infinite sequence produced by repeated application of f to a
 *
 * @tsplus static IterableOps unfold
 */
export function unfold<A>(a: A, f: (a: A) => A): Iterable<A> {
  return {
    *[Symbol.iterator]() {
      yield a
      let current = a
      while (true) {
        current = f(a)
        yield current
      }
    }
  }
}

/**
 * @tsplus fluent Iterable corresponds
 */
export function corresponds_<A, B>(
  self: Iterable<A>,
  that: Iterable<B>,
  f: (a: A, b: B) => boolean
) {
  const leftIt = self[Symbol.iterator]()
  const rightIt = that[Symbol.iterator]()
  // eslint-disable-next-line no-constant-condition
  while (1) {
    const lnext = leftIt.next()
    const rnext = rightIt.next()
    if (lnext.done !== rnext.done) {
      return false
    }
    if (lnext.done) {
      return true
    }
    if (!f(lnext.value, rnext.value)) {
      return false
    }
  }
  throw new Error("Bug")
}

export const corresponds = Pipeable(corresponds_)

/**
 * @tsplus static IterableOps make
 * @tsplus static IterableOps __call
 */
export function make<A extends readonly A[]>(...as: A): Iterable<A[number]> {
  return as
}
