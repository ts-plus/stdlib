/**
 * Performs unsafe coercion of types
 *
 * @tsplus macro identity
 */
export function unsafeCoerce<A, B>(a: A): B {
  return a as any;
}

/**
 * Models () => A
 */
export interface Lazy<A> {
  (): A;
}

/**
 * Models (a: A) => boolean
 */
export interface Predicate<A> {
  (a: A): boolean;
}

/**
 * Models (a: A) => a is B
 */
export interface Refinement<A, B extends A> {
  (a: A): a is B;
}

/**
 * Models (a: A) => A
 */
export interface Endomorphism<A> {
  (a: A): A;
}

/**
 * Models (...args: A) => B
 */
export interface FunctionN<A extends ReadonlyArray<unknown>, B> {
  (...args: A): B;
}

/**
 * Models a function argument which is evaluated lazily.
 *
 * For example:
 *
 * ```typescript
 * declare function succeed<A>(a: () => A): Effect<unknown, never, A>
 * ```
 *
 * @tsplus type tsplus/LazyArgument
 */
export interface LazyArg<A> {
  (): A;
}

/**
 * Will raise if called
 */
export function absurd<A = never>(_: never): A {
  throw new Error("Called `absurd` function which should be uncallable");
}

/**
 * A constant function that always return A
 */
export function constant<A>(a: A): Lazy<A> {
  return () => a;
}

/**
 * A thunk that returns always `false`
 */
export function constFalse(): boolean {
  return false;
}

/**
 * A thunk that returns always `null`
 */
export function constNull(): null {
  return null;
}

/**
 * A thunk that returns always `true`
 */
export function constTrue(): boolean {
  return true;
}

/**
 * A thunk that returns always `undefined`
 */
export function constUndefined(): undefined {
  return;
}

/**
 * A thunk that returns always `void`
 */
export function constVoid(): void {
  return;
}

/**
 * Flips the order of the arguments of a function of two arguments.
 */
export function flip<A, B, C>(f: (a: A, b: B) => C): (b: B, a: A) => C {
  return (b, a) => f(a, b);
}

/**
 * Identity function
 *
 * @tsplus macro identity
 */
export function identity<A>(a: A): A {
  return a;
}

/**
 * Force string to be literal
 *
 * @tsplus macro identity
 */
export function literal<K extends string>(k: K): K {
  return k;
}

/**
 * Type Hole, to be used while implementing functions where you need a placeholder
 */
export function hole<T>(): T {
  throw new Error("Hole should never be called");
}

export * from "@tsplus/stdlib/data/Function/pipe";
