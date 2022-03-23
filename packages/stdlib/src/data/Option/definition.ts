/* adapted from https://github.com/gcanti/fp-ts */

import type { LazyArg, Predicate, Refinement } from "@tsplus/stdlib/data/Function";
import { identity } from "@tsplus/stdlib/data/Function";
import { Tuple } from "@tsplus/stdlib/data/Tuple/definition";
import { Equals } from "@tsplus/stdlib/structure/Equals";
import { Hash } from "@tsplus/stdlib/structure/Hash";

const _noneHash = Hash.string("Option/None");
const _someHash = Hash.string("Option/Some");

/**
 * Definitions
 *
 * @tsplus type Option/None
 */
export class None implements Equals {
  readonly _tag = "None";

  [Equals.sym](that: unknown): boolean {
    return that instanceof None;
  }
  [Hash.sym](): number {
    return _noneHash;
  }
}

/**
 * @tsplus type Option/Some
 */
export class Some<A> implements Equals {
  readonly _tag = "Some";
  constructor(readonly value: A) {}

  [Equals.sym](that: unknown): boolean {
    return that instanceof Some && Equals.equals(this.value, that.value);
  }
  [Hash.sym](): number {
    return Hash.combine(_someHash, Hash.unknown(this.value));
  }
}

/**
 * @tsplus type Option
 */
export type Option<A> = None | Some<A>;

/**
 * @tsplus type OptionOps
 */
export interface OptionOps {}
export const Option: OptionOps = {};

/**
 * @tsplus unify Option
 */
export function unifyOption<X extends Option<any>>(
  self: X
): Option<[X] extends [Option<infer A>] ? A : never> {
  return self;
}

/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or
 * `undefined`, returns `None`, otherwise returns the value wrapped in a `Some`.
 *
 * @tsplus static OptionOps __call
 */
export function apply<A>(a: A): Option<NonNullable<A>> {
  return Option.fromNullable(a);
}

/**
 * Constructs `None`.
 *
 * @tsplus static OptionOps none
 */
export const none: Option<never> = new None();

/**
 * Constructs `None`.
 *
 * @tsplus static OptionOps emptyOf
 */
export function emptyOf<A>(): Option<A> {
  return none;
}

/**
 * Constructs `Some<A>`.
 *
 * @tsplus static OptionOps some
 */
export function some<A>(a: A): Option<A> {
  return new Some(a);
}

/**
 * Classic applicative.
 *
 * @tsplus fluent Option ap
 */
export function ap<A, B>(fab: Option<(a: A) => B>, fa: Option<A>): Option<B> {
  return isNone(fab) ? none : isNone(fa) ? none : some(fab.value(fa.value));
}

/**
 * Zips `Option<A>` and `Option<B>` into `Option<Tuple<[A, B]>>`.
 *
 * @tsplus operator Option +
 * @tsplus fluent Option zip
 */
export function zip<A, B>(fa: Option<A>, fb: Option<B>): Option<Tuple<[A, B]>> {
  return chain(fa, (a) => map(fb, (b) => Tuple(a, b)));
}

/**
 * Apply both and return first.
 *
 * @tsplus operator Option <
 * @tsplus fluent Option zipLeft
 */
export function zipLeft<A, B>(fa: Option<A>, fb: Option<B>): Option<A> {
  return ap(
    map(fa, (a) => () => a),
    fb
  );
}

/**
 * Apply both and return second.
 *
 * @tsplus operator Option >
 * @tsplus fluent Option zipRight
 */
export function zipRight<A, B>(fa: Option<A>, fb: Option<B>): Option<B> {
  return ap(
    map(fa, () => (b: B) => b),
    fb
  );
}

/**
 * Builds a new option constructed using the value of self.
 *
 * @tsplus fluent Option flatMap
 */
export function chain<A, B>(self: Option<A>, f: (a: A) => Option<B>): Option<B> {
  return isNone(self) ? none : f(self.value);
}

/**
 * Like chain but ignores the constructed outout.
 *
 * @tsplus fluent Option tap
 */
export function tap<A>(ma: Option<A>, f: (a: A) => Option<any>): Option<A> {
  return chain(ma, (a) => map(f(a), () => a));
}

/**
 * Flattens nested options.
 *
 * @tsplus fluent Option flatten
 */
export function flatten<A>(fa: Option<Option<A>>): Option<A> {
  return chain(fa, identity);
}

/**
 * Wraps this option into a second one.
 *
 * @tsplus fluent Option duplicate
 */
export function duplicate<A>(ma: Option<A>): Option<Option<A>> {
  return isNone(ma) ? none : some(ma);
}

/**
 * Returns `true` if the predicate is satisfied by the wrapped value.
 *
 * @tsplus fluent Option exists
 */
export function exists<A>(ma: Option<A>, predicate: Predicate<A>): boolean {
  return isNone(ma) ? false : predicate(ma.value);
}

/**
 * Apply `Option<A> => B` in case self is some returning `Option<B>`.
 *
 * @tsplus fluent Option extend
 */
export function extend<A, B>(self: Option<A>, f: (fa: Option<A>) => B): Option<B> {
  return isNone(self) ? none : some(f(self));
}

/**
 * Takes a default value, a function, and an `Option` value, if the `Option`
 * value is `None` the default value is returned, otherwise the function is
 * applied to the value inside the `Some` and the result is returned.
 *
 * @tsplus fluent Option fold
 */
export function fold<A, B, C>(
  ma: Option<A>,
  onNone: LazyArg<B>,
  onSome: (a: A) => C
): B | C {
  return isNone(ma) ? onNone() : onSome(ma.value);
}

// /**
//  * Constructs `Option<A>` from `Either<E, A>` discarding `E`.
//  *
//  * @tsplus static OptionOps fromEither
//  */
// export function fromEither<E, A>(ma: Either<E, A>): Option<A> {
//   return ma._tag === "Left" ? none : some(ma.right)
// }

/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or
 * `undefined`, returns `None`, otherwise returns the value wrapped in a `Some`.
 *
 * @tsplus static OptionOps fromNullable
 */
export function fromNullable<A>(a: A): Option<NonNullable<A>> {
  return a == null ? none : some(a as NonNullable<A>);
}

/**
 * Returns a smart constructor based on the given predicate.
 *
 * @tsplus static OptionOps fromPredicate
 */
export function fromPredicate<A, B extends A>(
  a: A,
  refinement: Refinement<A, B>
): Option<B>;
export function fromPredicate<A>(a: A, predicate: Predicate<A>): Option<A>;
export function fromPredicate<A>(a: A, predicate: Predicate<A>): Option<A> {
  return predicate(a) ? some(a) : none;
}

// /**
//  * Returns an `E` value if possible.
//  */
// export function getLeft<E, A>(ma: Either<E, A>): Option<E> {
//   return ma._tag === "Right" ? none : some(ma.left)
// }
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the
 * given default value.
 *
 * @tsplus fluent Option getOrElse
 */
export function getOrElse<A, B>(ma: Option<A>, onNone: LazyArg<B>): A | B {
  return ma._tag === "None" ? onNone() : ma.value;
}

/**
 * @tsplus operator Option |
 * @tsplus fluent Option orElse
 */
export function orElse_<A, B>(
  self: Option<A>,
  onNone: LazyArg<Option<B>>
): Option<A | B> {
  return self._tag === "None" ? onNone() : self;
}

export const orElse = Pipeable(orElse_);

/**
 * Returns a `Refinement` (i.e. a custom type guard) from a `Option` returning
 * function.
 *
 * This function ensures that a custom type guard definition is type-safe.
 *
 * @tsplus static OptionOps getRefinement
 */
export function getRefinement<A, B extends A>(
  getOption: (a: A) => Option<B>
): Refinement<A, B> {
  return (a: A): a is B => isSome(getOption(a));
}

// /**
//  * Returns an `A` value if possible.
//  */
// export function getRight<E, A>(ma: Either<E, A>): Option<A> {
//   return ma._tag === "Left" ? none : some(ma.right)
// }

/**
 * Returns `true` if the option is `None`, `false` otherwise.
 *
 * @tsplus fluent Option isNone
 */
export function isNone<A>(fa: Option<A>): fa is None {
  return fa._tag === "None";
}

/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise.
 *
 * @tsplus fluent Option isSome
 */
export function isSome<A>(fa: Option<A>): fa is Some<A> {
  return fa._tag === "Some";
}

/**
 * Use `A => B` to transform `Option<A>` to `Option<B>`.
 *
 * @tsplus fluent Option map
 */
export function map<A, B>(ma: Option<A>, f: (a: A) => B): Option<B> {
  return isNone(ma) ? none : some(f(ma.value));
}

/**
 * This is `chain` + `fromNullable`, useful when working with optional values.
 *
 * @tsplus fluent Option mapNullable
 */
export function mapNullable<A, B>(
  ma: Option<A>,
  f: (a: A) => B | null | undefined
): Option<B> {
  return isNone(ma) ? none : fromNullable(f(ma.value));
}

/**
 * Extracts the value out of the structure, if it exists. Otherwise returns
 * `null`.
 *
 * @tsplus fluent Option toNullable
 */
export function toNullable<A>(ma: Option<A>): A | null {
  return isNone(ma) ? null : ma.value;
}

/**
 * Extracts the value out of the structure, if it exists. Otherwise returns
 * `undefined`.
 *
 * @tsplus getter Option value
 */
export function toUndefined<A>(ma: Option<A>): A | undefined {
  return isNone(ma) ? undefined : ma.value;
}

/**
 * Transforms an exception into an `Option`. If `f` throws, returns `None`,
 * otherwise returns the output wrapped in `Some`.
 *
 * @tsplus static OptionOps tryCatch
 */
export function tryCatch<A>(f: LazyArg<A>): Option<A> {
  try {
    return some(f());
  } catch (e) {
    return none;
  }
}
