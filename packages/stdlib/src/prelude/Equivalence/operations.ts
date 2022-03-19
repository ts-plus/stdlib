import type { Tuple } from "@tsplus/stdlib/data/Tuple/definition"
import { Equivalence } from "@tsplus/stdlib/prelude/Equivalence/definition"
import type { ForcedTuple } from "@tsplus/stdlib/utilities/Types"

/**
 * Constructs an `Equal[A]` from a function. The instance will be optimized
 * to first compare the values for reference equality and then compare the
 * values for value equality.
 *
 * @tsplus static EquivalenceOps __call
 */
export function makeEquivalence<A>(f: (x: A, y: A) => boolean): Equivalence<A> {
  return {
    equals: f
  }
}

/**
 * Equality for `Any` values. Note that since values of type `Any` contain
 * no information, all values of type `Any` can be treated as equal to each
 * other.
 *
 * @tsplus static EquivalenceOps any
 */
export const any: Equivalence<unknown> = Equivalence(() => true)

/**
 * Equality for `Nothing` values. Note that since there are not values of
 * type `Nothing` the `equals` method of this instance can never be called
 * but it can be useful in deriving instances for more complex types.
 *
 * @tsplus static EquivalenceOps never
 */
export const never: Equivalence<never> = Equivalence(() => false)

/**
 * Constructs an `Equal[(A, B)]` given an `Equal[A]` and `Equal[B]` by first
 * comparing the `A` values for equality and then comparing the `B` values
 * for equality, if necessary.
 */
export function both<A, B>(
  fa: Equivalence<A>,
  fb: Equivalence<B>
): Equivalence<Tuple<[A, B]>> {
  return Equivalence(
    ({ tuple: [x0, x1] }, { tuple: [y0, y1] }) => fa.equals(x0, y0) && fb.equals(x1, y1)
  )
}

// /**
//  * Constructs an `Equal[Either[A, B]]` given an `Equal[A]` and an
//  * `Equal[B]`. The instance will compare the `Either[A, B]` values and if
//  * both are `Right` or `Left` compare them for equality.
//  */
// export function orElseEither<B>(
//   fb: () => Equal<B>
// ): <A>(fa: Equal<A>) => Equal<E.Either<A, B>> {
//   return (fa) =>
//     makeEqual((ex, ey) =>
//       ex._tag === "Left" && ey._tag === "Left"
//         ? fa.equals(ex.left, ey.left)
//         : ex._tag === "Right" && ey._tag === "Right"
//         ? fb().equals(ex.right, ey.right)
//         : false
//     )
// }

/**
 * Constructs an `Equal[B]` given an `Equal[A]` and a function `f` to
 * transform a `B` value into an `A` value. The instance will convert each
 * `B` value into an `A` and the compare the `A` values for equality.
 */
export function contramap<A, B>(
  f: (a: B) => A
): (fa: Equivalence<A>) => Equivalence<B> {
  return (fa) => Equivalence((x, y) => fa.equals(f(x), f(y)))
}

/**
 * Constructs an `Equal[A]` that uses the default notion of equality
 * embodied in the implementation of `equals` for values of type `A`.
 */
export function strict<A>() {
  return makeEquivalence<A>((x, y) => x === y)
}

/**
 * Equality for `number` values.
 *
 * @tsplus static EquivalenceOps number
 */
export const number = strict<number>()

/**
 * Equality for `string` values.
 *
 * @tsplus static EquivalenceOps string
 */
export const string = strict<string>()

/**
 * Equality for `symbol` values.
 *
 * @tsplus static EquivalenceOps symbol
 */
export const symbol = strict<symbol>()

/**
 * Equality for `boolean` values.
 *
 * @tsplus static EquivalenceOps boolean
 */
export const boolean = strict<boolean>()

/**
 * Equality for `Date` values.
 *
 * @tsplus static EquivalenceOps date
 */
export const date: Equivalence<Date> = contramap((date: Date) => date.valueOf())(number)

/**
 * Derives an `Equal[Array[A]]` given an `Equal[A]`.
 *
 * @tsplus fluent Equivalence array
 * @tsplus static EquivalenceOps array
 */
export function array<A>(EqA: Equivalence<A>): Equivalence<readonly A[]> {
  return {
    equals: (x, y) => {
      if (x.length === y.length) {
        for (let i = 0; i < x.length; i++) {
          if (!EqA.equals(x[i]!, y[i]!)) {
            return false
          }
        }
        return true
      }
      return false
    }
  }
}

/**
 * Given a tuple of `Equal`s returns a `Equal` for the tuple
 *
 * @tsplus static EquivalenceOps tuple
 */
export function tuple<T extends ReadonlyArray<Equivalence<any>>>(
  ...eqs: T
): Equivalence<
  ForcedTuple<{
    [K in keyof T]: T[K] extends Equivalence<infer A> ? A : never
  }>
> {
  return Equivalence((x, y) => eqs.every((E, i) => E.equals(x.get(i), y.get(i))))
}

/**
 * Given a struct of `Equal`s returns a `Equal` for the struct
 *
 * @tsplus static EquivalenceOps struct
 */
export function struct<O extends Record<string, any>>(eqs: {
  [K in keyof O]: Equivalence<O[K]>
}): Equivalence<O> {
  return Equivalence((x, y) => {
    for (const k in eqs) {
      if (!eqs[k].equals(x[k], y[k])) {
        return false
      }
    }
    return true
  })
}
