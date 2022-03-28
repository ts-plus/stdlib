declare global {
  /**
   * @tsplus type Iterable
   */
  export interface Iterable<T> {}
}

export type Iterable<A> = ESIterable<A>;

/**
 * @tsplus type IterableOps
 */
export interface IterableOps {}
export const Iterable: IterableOps = {};

function* genOf<A>(a: A) {
  yield a;
}

function* genMap<A, B>(iterator: Iterator<A>, mapping: (a: A, i: number) => B) {
  let n = -1;
  while (true) {
    const result = iterator.next();
    if (result.done) {
      break;
    }
    n += 1;
    yield mapping(result.value, n);
  }
}

function* genChain<A, B>(iterator: Iterator<A>, mapping: (a: A) => Iterable<B>) {
  while (true) {
    const result = iterator.next();
    if (result.done) {
      break;
    }
    const ib = mapping(result.value)[Symbol.iterator]();
    while (true) {
      const result = ib.next();
      if (result.done) {
        break;
      }
      yield result.value;
    }
  }
}

/**
 * Zips the values of both iterators with the provided zipper function
 *
 * @tsplus fluent Iterable zipWith
 */
export function zipWith_<A, B, C>(
  self: Iterable<A>,
  that: Iterable<B>,
  zipper: (a: A, b: B) => C
): Iterable<C> {
  // inspired from "Closing Iterables is a Leaky Abstraction" by Reginald Braithwaite
  // https://raganwald.com/2017/07/22/closing-iterables-is-a-leaky-abstraction.html
  return {
    [Symbol.iterator]() {
      let done = false;
      const ia = self[Symbol.iterator]();
      const ib = that[Symbol.iterator]();
      return {
        next() {
          if (done) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return this.return!();
          }

          const va = ia.next();
          const vb = ib.next();

          return va.done || vb.done
            ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              this.return!()
            : { done: false, value: zipper(va.value, vb.value) };
        },
        return(value?: unknown) {
          if (!done) {
            done = true;

            if (typeof ia.return === "function") {
              ia.return();
            }
            if (typeof ib.return === "function") {
              ib.return();
            }
          }

          return { done: true, value };
        }
      };
    }
  };
}

/**
 * Zips the values of both iterators with the provided zipper function
 */
export const zipWith = Pipeable(zipWith_);

/**
 * Maps the values of the iterator using the provided function
 *
 * @tsplus fluent Iterable map
 */
export function map_<A, B>(i: Iterable<A>, f: (a: A, k: number) => B): Iterable<B> {
  return {
    [Symbol.iterator]: () => genMap(i[Symbol.iterator](), f)
  };
}

/**
 * Maps the values of the iterator using the provided function
 */
export const map = Pipeable(map_);

/**
 * Zips the two iterators into an iterator of a tuple
 *
 * @tsplus fluent Iterable zip
 */
export function zip_<A, B>(fa: Iterable<A>, fb: Iterable<B>): Iterable<Tuple<[A, B]>> {
  return fa.zipWith(fb, Tuple.make);
}

/**
 * Zips the two iterators into an iterator of a tuple
 */
export const zip = Pipeable(zip_);

/**
 * Maps the iterator using the provided function and flatten its result
 *
 * @tsplus fluent Iterable flatMap
 */
export function flatMap_<A, B>(i: Iterable<A>, f: (a: A) => Iterable<B>): Iterable<B> {
  return {
    [Symbol.iterator]: () => genChain(i[Symbol.iterator](), f)
  };
}

/**
 * Maps the iterator using the provided function and flatten its result
 */
export const flatMap = Pipeable(flatMap_);

/**
 * Applicative's apply
 *
 * @tsplus fluent Iterable ap
 */
export function ap_<A, B>(fab: Iterable<(a: A) => B>, fa: Iterable<A>): Iterable<B> {
  return flatMap_(fab, (f) => map_(fa, f));
}

/**
 * Applicative's apply
 */
export const ap = Pipeable(ap_);

/**
 * Creates an iterator of a single value
 *
 * @tsplus static IterableOps of
 */
export function of<A>(a: A): Iterable<A> {
  return {
    [Symbol.iterator]: () => genOf(a)
  };
}

/**
 * Takes the fist n elements
 *
 * @tsplus fluent Iterable take
 */
export function take_<A>(a: Iterable<A>, n: number): Iterable<A> {
  return {
    *[Symbol.iterator]() {
      let i = 0;
      for (const x of a) {
        if (i++ >= n) {
          return;
        }
        yield x;
      }
    }
  };
}

/**
 * Takes the fist n elements
 */
export const take = Pipeable(take_);

/**
 * Skips the first n elements
 *
 * @tsplus fluent Iterable skip
 */
export function skip_<A>(a: Iterable<A>, n: number): Iterable<A> {
  return {
    *[Symbol.iterator]() {
      let i = 0;
      for (const x of a) {
        if (i++ >= n) {
          yield x;
        }
      }
    }
  };
}

/**
 * Skips the first n elements
 */
export const skip = Pipeable(skip_);

/**
 * Empty iterator
 *
 * @tsplus static IterableOps never
 */
export const never: Iterable<never> = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  *[Symbol.iterator]() {}
};

/**
 * Loops over the iterator accumulating a result using the provided function giving access to the element index
 *
 * @tsplus fluent Iterable reduceWithIndex
 */
export function reduceWithIndex_<A, B>(
  self: Iterable<A>,
  b: B,
  f: (b: B, a: A, index: number) => B
): B {
  let res = b;
  let n = -1;
  const iterator = self[Symbol.iterator]();
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const result = iterator.next();
    if (result.done) {
      break;
    }
    n += 1;
    res = f(res, result.value, n);
  }
  return res;
}

/**
 * Loops over the iterator accumulating a result using the provided function giving access to the element index
 */
export const reduceWithIndex = Pipeable(reduceWithIndex_);

/**
 * Loops over the iterator accumulating a result using the provided function
 *
 * @tsplus fluent Iterable reduce
 */
export function reduce_<A, B>(
  self: Iterable<A>,
  b: B,
  f: (b: B, a: A) => B
): B {
  let res = b;
  const iterator = self[Symbol.iterator]();
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const result = iterator.next();
    if (result.done) {
      break;
    }
    res = f(res, result.value);
  }
  return res;
}

/**
 * Loops over the iterator accumulating a result using the provided function
 */
export const reduce = Pipeable(reduce_);

/**
 * Loops over the iterator accumulating a result using the provided function and AssociativeIdentity giving access to the element index
 *
 * @tsplus fluent Iterable foldMapWithIndex
 */
export function foldMapWithIndex_<M, A>(
  self: Iterable<A>,
  M: AssociativeIdentity<M>,
  f: (a: A, index: number) => M
): M {
  let res = M.identity;
  let n = -1;
  const iterator = self[Symbol.iterator]();
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const result = iterator.next();
    if (result.done) {
      break;
    }
    n += 1;
    res = M.combine(res, f(result.value, n));
  }
  return res;
}

/**
 * Loops over the iterator accumulating a result using the provided function and AssociativeIdentity giving access to the element index
 */
export const foldMapWithIndex = Pipeable(foldMapWithIndex_);

/**
 * Loops over the iterator accumulating a result using the provided function and AssociativeIdentity
 *
 * @tsplus fluent Iterable foldMap
 */
export function foldMap_<M, A>(
  self: Iterable<A>,
  M: AssociativeIdentity<M>,
  f: (a: A) => M
): M {
  let res = M.identity;
  const iterator = self[Symbol.iterator]();
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const result = iterator.next();
    if (result.done) {
      break;
    }
    res = M.combine(res, f(result.value));
  }
  return res;
}

/**
 * Loops over the iterator accumulating a result using the provided function and AssociativeIdentity
 */
export const foldMap = Pipeable(foldMap_);

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
 * Concats iterators together
 *
 * @tsplus fluent Iterable concat
 * @tsplus operator Iterable &
 */
export function concat_<A, B>(self: Iterable<A>, that: Iterable<B>): Iterable<A | B> {
  return {
    *[Symbol.iterator]() {
      for (const x of self) {
        yield x;
      }
      for (const x of that) {
        yield x;
      }
    }
  };
}

/**
 * Concats iterators together
 */
export const concat = Pipeable(concat_);

/**
 * Concats iterators together that are strictly of the same type
 *
 * @tsplus operator Iterable +
 */
export const concatOperator: <A>(self: Iterable<A>, that: Iterable<A>) => Iterable<A> = concat_;

/**
 * Prepends a value to an iterator
 *
 * @tsplus fluent Iterable prepend
 */
export function prepend_<A, B>(self: Iterable<A>, that: B): Iterable<A | B> {
  return {
    *[Symbol.iterator]() {
      yield that;
      for (const x of self) {
        yield x;
      }
    }
  };
}

/**
 * Prepends a value to an iterator
 */
export const prepend = Pipeable(prepend_);

/**
 * Prepends a value to an iterator
 *
 * @tsplus operator Iterable >
 */
export function prependOperator<A, B>(a: A, self: Iterable<B>): Iterable<A | B> {
  return prepend_(self, a);
}

/**
 * Prepends a value to an iterator of the same type
 *
 * @tsplus operator Iterable + 1.0
 */
export const prependOperatorStrict: <A>(a: A, self: Iterable<A>) => Iterable<A> = prependOperator;

/**
 * Appends a value to an iterator
 *
 * @tsplus fluent Iterable append
 * @tsplus operator Iterable <
 */
export function append_<A, B>(self: Iterable<A>, that: B): Iterable<A | B> {
  return {
    *[Symbol.iterator]() {
      yield that;
      for (const x of self) {
        yield x;
      }
    }
  };
}

/**
 * Appends a value to an iterator
 */
export const append = Pipeable(append_);

/**
 * Appends a value to an iterator of the same type
 *
 * @tsplus operator Iterable + 1.0
 */
export const appendOperatorStrict: <A>(self: Iterable<A>, a: A) => Iterable<A> = append_;

/**
 * Flattens nested iterators
 *
 * @tsplus fluent Iterable flatten
 */
export function flatten<A>(a: Iterable<Iterable<A>>) {
  return flatMap_(a, identity);
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
      yield a;
      let current = a;
      while (true) {
        current = f(a);
        yield current;
      }
    }
  };
}

/**
 * Compares each element of the iterators using the provided function
 *
 * @tsplus fluent Iterable equalsWith
 */
export function equalsWith_<A, B>(
  self: Iterable<A>,
  that: Iterable<B>,
  f: (a: A, b: B) => boolean
) {
  const leftIt = self[Symbol.iterator]();
  const rightIt = that[Symbol.iterator]();
  // eslint-disable-next-line no-constant-condition
  while (1) {
    const lnext = leftIt.next();
    const rnext = rightIt.next();
    if (lnext.done !== rnext.done) {
      return false;
    }
    if (lnext.done) {
      return true;
    }
    if (!f(lnext.value, rnext.value)) {
      return false;
    }
  }
  throw new Error("Bug");
}

/**
 * Compares each element of the iterators using the provided function
 */
export const equalsWith = Pipeable(equalsWith_);

/**
 * Compares the iterators using value equality
 *
 * @tsplus operator Iterable ==
 * @tsplus fluent Iterable equals
 */
export function equals_<A, B>(self: Iterable<A>, that: Iterable<B>) {
  return self.equalsWith(that, Equals.equals);
}

/**
 * Compares the iterators using value equality
 */
export const equals = Pipeable(equals_);

/**
 * @tsplus static IterableOps make
 * @tsplus static IterableOps __call
 */
export function make<A extends readonly any[]>(...as: A): Iterable<A[number]> {
  return as;
}
