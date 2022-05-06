/* adapted from https://github.com/gcanti/fp-ts */
/**
 * @tsplus type Option
 */
export type Option<A> = None | Some<A>;

export interface OptionF extends HKT {
  readonly type: Option<this["A"]>;
}

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

export declare namespace Option {
  export type HKT = OptionF;
}

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
 * @tsplus unify Option
 * @tsplus unify Option/Some
 * @tsplus unify Option/None
 */
export function unifyOption<X extends Option<any>>(
  self: X
): Option<[X] extends [Option<infer A>] ? A : never> {
  return self;
}

export type ArrayOfOptions<Ts extends Option<any>[]> = {
  [k in keyof Ts]: Ts[k] extends Option<infer A> ? A : never;
}[number];

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
 * @tsplus macro pipe
 * @tsplus fluent Option __call
 */
export const optionPipe: typeof pipe = pipe;
