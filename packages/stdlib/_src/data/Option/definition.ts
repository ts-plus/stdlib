/* adapted from https://github.com/gcanti/fp-ts */

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
 * @tsplus type Option/Ops
 */
export interface OptionOps {
  $: OptionAspects;
}
export const Option: OptionOps = {
  $: {}
};

/**
 * @tsplus type Option/Aspects
 */
export interface OptionAspects {}

/**
 * @tsplus unify Option
 * @tsplus unify Option/Some
 * @tsplus unify Option/None
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
 * @tsplus static Option/Ops __call
 */
export function apply<A>(a: A): Option<NonNullable<A>> {
  return Option.fromNullable(a);
}

/**
 * Constructs `None`.
 *
 * @tsplus static Option/Ops none
 */
export const none: Option<never> = new None();

/**
 * Constructs `None`.
 *
 * @tsplus static Option/Ops emptyOf
 */
export function emptyOf<A>(): Option<A> {
  return none;
}

/**
 * Constructs `Some<A>`.
 *
 * @tsplus static Option/Ops some
 */
export function some<A>(a: A): Option<A> {
  return new Some(a);
}

/**
 * Classic applicative.
 *
 * @tsplus fluent Option ap
 */
export function ap_<A, B>(fab: Option<(a: A) => B>, fa: Option<A>): Option<B> {
  return isNone(fab) ?
    none :
    isNone(fa) ?
    none :
    some(fab.value(fa.value));
}

/**
 * @tsplus static Option/Aspects ap
 */
export const ap = Pipeable(ap_);

/**
 * Zips `Option<A>` and `Option<B>` into `Option<Tuple<[A, B]>>`.
 *
 * @tsplus operator Option +
 * @tsplus fluent Option zip
 */
export function zip_<A, B>(fa: Option<A>, fb: Option<B>): Option<Tuple<[A, B]>> {
  return fa.flatMap((a) => fb.map((b) => Tuple(a, b)));
}

/**
 * @tsplus static Option/Aspects zip
 */
export const zip = Pipeable(zip_);

/**
 * Zips `Option<A>` and `Option<B>` into `Option<C>` using the provided zipper.
 *
 * @tsplus fluent Option zipWith
 */
export function zipWith_<A, B, C>(fa: Option<A>, fb: Option<B>, zipper: (a: A, b: B) => C): Option<C> {
  return fa.flatMap((a) => fb.map((b) => zipper(a, b)));
}

/**
 * @tsplus static Option/Aspects zipWith
 */
export const zipWith = Pipeable(zipWith_);

/**
 * Apply both and return first.
 *
 * @tsplus operator Option <
 * @tsplus fluent Option zipLeft
 */
export function zipLeft_<A, B>(fa: Option<A>, fb: Option<B>): Option<A> {
  return fa.map((a) => () => a).ap(fb);
}

/**
 * @tsplus static Option/Aspects zipLeft
 */
export const zipLeft = Pipeable(zipLeft_);

/**
 * Apply both and return second.
 *
 * @tsplus operator Option >
 * @tsplus fluent Option zipRight
 */
export function zipRight_<A, B>(fa: Option<A>, fb: Option<B>): Option<B> {
  return fa.map(() => (b: B) => b).ap(fb);
}

/**
 * @tsplus static Option/Aspects zipRight
 */
export const zipRight = Pipeable(zipRight_);

/**
 * Builds a new option constructed using the value of self.
 *
 * @tsplus fluent Option flatMap
 */
export function flatMap_<A, B>(self: Option<A>, f: (a: A) => Option<B>): Option<B> {
  return isNone(self) ? none : f(self.value);
}

/**
 * @tsplus static Option/Aspects flatMap
 */
export const flatMap = Pipeable(flatMap_);

/**
 * Like chain but ignores the constructed outout.
 *
 * @tsplus fluent Option tap
 */
export function tap_<A>(ma: Option<A>, f: (a: A) => Option<any>): Option<A> {
  return ma.flatMap((a) => f(a).map(() => a));
}

/**
 * @tsplus static Option/Aspects tap
 */
export const tap = Pipeable(tap_);

/**
 * Flattens nested options.
 *
 * @tsplus fluent Option flatten
 * @tsplus static Option/Aspects flatten
 */
export function flatten<A>(fa: Option<Option<A>>): Option<A> {
  return fa.flatMap(identity);
}

/**
 * Wraps this option into a second one.
 *
 * @tsplus fluent Option duplicate
 * @tsplus static Option/Aspects duplicate
 */
export function duplicate<A>(ma: Option<A>): Option<Option<A>> {
  return ma.isNone() ? Option.none : Option.some(ma);
}

/**
 * Returns `true` if the predicate is satisfied by the wrapped value.
 *
 * @tsplus fluent Option exists
 */
export function exists_<A>(ma: Option<A>, predicate: Predicate<A>): boolean {
  return ma.isNone() ? false : predicate(ma.value);
}

/**
 * @tsplus static Option/Aspects exists
 */
export const exists = Pipeable(exists_);

/**
 * Apply `Option<A> => B` in case self is some returning `Option<B>`.
 *
 * @tsplus fluent Option extend
 */
export function extend_<A, B>(self: Option<A>, f: (fa: Option<A>) => B): Option<B> {
  return self.isNone() ? Option.none : Option.some(f(self));
}

/**
 * @tsplus static Option/Aspects extend
 */
export const extend = Pipeable(extend_);

/**
 * Takes a default value, a function, and an `Option` value, if the `Option`
 * value is `None` the default value is returned, otherwise the function is
 * applied to the value inside the `Some` and the result is returned.
 *
 * @tsplus fluent Option fold
 */
export function fold_<A, B, C>(
  ma: Option<A>,
  onNone: LazyArg<B>,
  onSome: (a: A) => C
): B | C {
  return ma.isNone() ? onNone() : onSome(ma.value);
}

/**
 * @tsplus static Option/Aspects fold
 */
export const fold = Pipeable(fold_);

/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or
 * `undefined`, returns `None`, otherwise returns the value wrapped in a `Some`.
 *
 * @tsplus static Option/Ops fromNullable
 */
export function fromNullable<A>(a: A): Option<NonNullable<A>> {
  return a == null ? Option.none : Option.some(a as NonNullable<A>);
}

/**
 * Returns a smart constructor based on the given predicate.
 *
 * @tsplus static Option/Ops fromPredicate
 */
export function fromPredicate<A, B extends A>(
  a: A,
  refinement: Refinement<A, B>
): Option<B>;
export function fromPredicate<A>(a: A, predicate: Predicate<A>): Option<A>;
export function fromPredicate<A>(a: A, predicate: Predicate<A>): Option<A> {
  return predicate(a) ? Option.some(a) : Option.none;
}

/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the
 * given default value.
 *
 * @tsplus fluent Option getOrElse
 */
export function getOrElse_<A, B>(self: Option<A>, onNone: LazyArg<B>): A | B {
  return self.isNone() ? onNone() : self.value;
}

/**
 * @tsplus static Option/Aspects getOrElse
 */
export const getOrElse = Pipeable(getOrElse_);

/**
 * @tsplus operator Option |
 * @tsplus fluent Option orElse
 */
export function orElse_<A, B>(
  self: Option<A>,
  onNone: LazyArg<Option<B>>
): Option<A | B> {
  return self.isNone() ? onNone() : self;
}

/**
 * @tsplus static Option/Aspects orElse
 */
export const orElse = Pipeable(orElse_);

/**
 * Returns a `Refinement` (i.e. a custom type guard) from a `Option` returning
 * function.
 *
 * This function ensures that a custom type guard definition is type-safe.
 *
 * @tsplus static Option/Ops getRefinement
 */
export function getRefinement<A, B extends A>(
  getOption: (a: A) => Option<B>
): Refinement<A, B> {
  return (a: A): a is B => getOption(a).isSome();
}

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
 * @tsplus static Option/Ops isOption
 */
export function isOption(u: unknown): u is Option<unknown> {
  return (
    typeof u === "object" &&
    u != null &&
    "_tag" in u &&
    (u["_tag"] === "Some" || u["_tag"] === "None")
  );
}

/**
 * Use `A => B` to transform `Option<A>` to `Option<B>`.
 *
 * @tsplus fluent Option map
 */
export function map_<A, B>(ma: Option<A>, f: (a: A) => B): Option<B> {
  return ma.isNone() ? Option.none : Option.some(f(ma.value));
}

/**
 * @tsplus static Option/Aspects map
 */
export const map = Pipeable(map_);

/**
 * This is `chain` + `fromNullable`, useful when working with optional values.
 *
 * @tsplus fluent Option mapNullable
 */
export function mapNullable_<A, B>(
  ma: Option<A>,
  f: (a: A) => B | null | undefined
): Option<B> {
  return ma.isNone() ? Option.none : Option.fromNullable(f(ma.value));
}

/**
 * @tsplus static Option/Aspects mapNullable
 */
export const mapNullable = Pipeable(mapNullable_);

/**
 * Extracts the value out of the structure, if it exists. Otherwise returns
 * `null`.
 *
 * @tsplus fluent Option toNullable
 */
export function toNullable<A>(ma: Option<A>): A | null {
  return ma.isNone() ? null : ma.value;
}

/**
 * Extracts the value out of the structure, if it exists. Otherwise returns
 * `undefined`.
 *
 * @tsplus getter Option value
 */
export function toUndefined<A>(ma: Option<A>): A | undefined {
  return ma.isNone() ? undefined : ma.value;
}

/**
 * Transforms an exception into an `Option`. If `f` throws, returns `None`,
 * otherwise returns the output wrapped in `Some`.
 *
 * @tsplus static Option/Ops tryCatch
 */
export function tryCatch<A>(f: LazyArg<A>): Option<A> {
  try {
    return Option.some(f());
  } catch (e) {
    return Option.none;
  }
}

/**
 * @tsplus macro pipe
 * @tsplus fluent Option __call
 */
export const optionPipe: typeof pipe = pipe;
