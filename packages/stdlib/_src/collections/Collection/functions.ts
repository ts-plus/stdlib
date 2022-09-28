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

function* genChain<A, B>(iterator: Iterator<A>, mapping: (a: A) => Collection<B>) {
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
 * Zips the values of both iterators with the provided zipper function
 *
 * @tsplus static Collection.Aspects zipWith
 * @tsplus pipeable Collection zipWith
 */
export function zipWith<A, B, C>(that: Collection<B>, zipper: (a: A, b: B) => C) {
  return (self: Collection<A>): Collection<C> => {
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
}

/**
 * Maps the values of the iterator using the provided function
 *
 * @tsplus static Collection.Aspects map
 * @tsplus pipeable Collection map
 */
export function map<A, B>(f: (a: A, k: number) => B) {
  return (self: Collection<A>): Collection<B> => {
    return {
      [Symbol.iterator]: () => genMap(self[Symbol.iterator](), f)
    }
  }
}

/**
 * Zips the two iterators into an iterator of a tuple
 *
 * @tsplus static Collection.Aspects zip
 * @tsplus pipeable Collection zip
 */
export function zip<B>(that: Collection<B>) {
  return <A>(self: Collection<A>): Collection<readonly [A, B]> =>
    self.zipWith(that, (a, b) => [a, b])
}

/**
 * Maps the iterator using the provided function and flatten its result
 *
 * @tsplus static Collection.Aspects flatMap
 * @tsplus pipeable Collection flatMap
 */
export function flatMap<A, B>(f: (a: A) => Collection<B>) {
  return (self: Collection<A>): Collection<B> => {
    return {
      [Symbol.iterator]: () => genChain(self[Symbol.iterator](), f)
    }
  }
}

/**
 * Applicative's apply
 *
 * @tsplus static Collection.Aspects ap
 * @tsplus pipeable Collection ap
 */
export function ap<A, B>(fa: Collection<A>) {
  return (fab: Collection<(a: A) => B>): Collection<B> => fab.flatMap((f) => fa.map(f))
}

/**
 * Creates an iterator of a single value
 *
 * @tsplus static Collection.Ops of
 */
export function of<A>(a: A): Collection<A> {
  return {
    [Symbol.iterator]: () => genOf(a)
  }
}

/**
 * Takes the fist n elements
 *
 * @tsplus static Collection.Aspects take
 * @tsplus pipeable Collection take
 */
export function take(n: number) {
  return <A>(self: Collection<A>): Collection<A> => {
    return {
      *[Symbol.iterator]() {
        let i = 0
        for (const x of self) {
          if (i++ >= n) {
            return
          }
          yield x
        }
      }
    }
  }
}

/**
 * Skips the first n elements
 *
 * @tsplus static Collection.Aspects skip
 * @tsplus pipeable Collection skip
 */
export function skip(n: number) {
  return <A>(a: Collection<A>): Collection<A> => {
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
}

/**
 * Empty iterator
 *
 * @tsplus static Collection.Ops never
 */
export const never: Collection<never> = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  *[Symbol.iterator]() {}
}

/**
 * Loops over the iterator accumulating a result using the provided function giving access to the element index
 *
 * @tsplus static Collection.Aspects reduceWithIndex
 * @tsplus pipeable Collection reduceWithIndex
 */
export function reduceWithIndex<A, B>(b: B, f: (b: B, a: A, index: number) => B) {
  return (self: Collection<A>): B => {
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
}

/**
 * Loops over the iterator accumulating a result using the provided function
 *
 * @tsplus static Collection.Aspects reduce
 * @tsplus pipeable Collection reduce
 */
export function reduce<A, B>(b: B, f: (b: B, a: A) => B) {
  return (self: Collection<A>): B => {
    let res = b
    const iterator = self[Symbol.iterator]()
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const result = iterator.next()
      if (result.done) {
        break
      }
      res = f(res, result.value)
    }
    return res
  }
}

/**
 * Loops over the iterator accumulating a result using the provided function and AssociativeIdentity giving access to the element index
 *
 * @tsplus static Collection.Aspects foldMapWithIndex
 * @tsplus pipeable Collection foldMapWithIndex
 */
export function foldMapWithIndex<M, A>(M: AssociativeIdentity<M>, f: (a: A, index: number) => M) {
  return (self: Collection<A>): M => {
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
}

/**
 * Loops over the iterator accumulating a result using the provided function and AssociativeIdentity
 *
 * @tsplus static Collection.Aspects foldMap
 * @tsplus pipeable Collection foldMap
 */
export function foldMap<M, A>(M: AssociativeIdentity<M>, f: (a: A) => M) {
  return (self: Collection<A>): M => {
    let res = M.identity
    const iterator = self[Symbol.iterator]()
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const result = iterator.next()
      if (result.done) {
        break
      }
      res = M.combine(res, f(result.value))
    }
    return res
  }
}

/**
 * Concats iterators together
 *
 * @tsplus pipeable-operator Collection &
 * @tsplus static Collection.Aspects concat
 * @tsplus pipeable Collection concat
 */
export function concat<B>(that: Collection<B>) {
  return <A>(self: Collection<A>): Collection<A | B> => {
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
}

/**
 * Concats iterators together that are strictly of the same type
 *
 * @tsplus pipeable-operator Collection +
 */
export function concatOperator<A>(that: Collection<A>) {
  return (self: Collection<A>): Collection<A> => self.concat(that)
}

/**
 * Prepends a value to an iterator
 *
 * @tsplus static Collection.Aspects prepend
 * @tsplus pipeable Collection prepend
 */
export function prepend<B>(that: B) {
  return <A>(self: Collection<A>): Collection<A | B> => {
    return {
      *[Symbol.iterator]() {
        yield that
        for (const x of self) {
          yield x
        }
      }
    }
  }
}

/**
 * Prepends a value to an iterator
 *
 * @tsplus pipeable-operator Collection >
 */
export function prependOperator<B>(self: Collection<B>) {
  return <A>(a: A): Collection<A | B> => self.prepend(a)
}

/**
 * Prepends a value to an iterator of the same type
 *
 * @tsplus pipeable-operator Collection + 1.0
 */
export function prependOperatorStrict<A>(self: Collection<A>) {
  return (a: A): Collection<A> => a > self
}

/**
 * Appends a value to an iterator.
 *
 * @tsplus pipeable-operator Collection <
 * @tsplus static Collection.Aspects append
 * @tsplus pipeable Collection append
 */
export function append<B>(that: B) {
  return <A>(self: Collection<A>): Collection<A | B> => {
    return {
      *[Symbol.iterator]() {
        for (const x of self) {
          yield x
        }
        yield that
      }
    }
  }
}

/**
 * Appends a value to an iterator of the same type
 *
 * @tsplus pipeable-operator Collection + 1.0
 */
export function appendOperatorStrict<A>(a: A) {
  return (self: Collection<A>): Collection<A> => self.append(a)
}

/**
 * Flattens nested iterators
 *
 * @tsplus getter Collection flatten
 */
export function flatten<A>(self: Collection<Collection<A>>) {
  return self.flatMap(identity)
}

/**
 * Infinite sequence produced by repeated application of f to a
 *
 * @tsplus static Collection.Ops unfold
 */
export function unfold<A>(a: A, f: (a: A) => A): Collection<A> {
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
 * Compares each element of the iterators using the provided function
 *
 * @tsplus static Collection.Aspects equalsWith
 * @tsplus pipeable Collection equalsWith
 */
export function equalsWith<A, B>(that: Collection<B>, f: (a: A, b: B) => boolean) {
  return (self: Collection<A>): boolean => {
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
}

/**
 * Compares the iterators using value equality
 *
 * @tsplus pipeable-operator Collection ==
 * @tsplus static Collection.Aspects equals
 * @tsplus pipeable Collection equals
 */
export function equals<A>(that: Collection<A>): (self: Collection<A>) => boolean
export function equals<B>(that: Collection<B>): <A>(self: Collection<A>) => boolean
export function equals<B>(that: Collection<B>) {
  return <A>(self: Collection<A>): boolean => self.equalsWith(that, Equals.equals)
}

/**
 * @tsplus static Collection.Ops make
 * @tsplus static Collection.Ops __call
 */
export function make<A extends readonly any[]>(...as: A): Collection<A[number]> {
  return as
}

/**
 * @tsplus getter Collection toArray
 */
export function toArray<A>(data: Collection<A>): Array<A> {
  return Array.from(data)
}
