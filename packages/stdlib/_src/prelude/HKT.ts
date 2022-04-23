//
// Proposal
//

//
// Pros:
//
// - Infers required instances from types, that enables ts+ to resolve instances via derivation
// - Uniqueness of the mapping Type => Higher Kinded

//
// Cons:
//
// - There is no way to distinguish if Array<Option<A>> should be treated like F[_] or F[Option[_]]
//   that means non wrapping transformers won't be possible (like it should be but may be a bit painful)

//
// Conclusion:
//
// - If we can get TS+ to consider typeclasses for extensions and auto-wire them in call site we can have
//   things like [0, 1].mapM(x => Effect.succeed(x + 1)) that would be of big benefit for DX (more than transformers)
//

//
// Useful cases for transformers to be thought differently:
//
// - Validation => could be a different type generic over a kind
// - Effect[Option] => lossful optional Effect.succeed(Option(1)).optional() == Effect[R, None, number] and Effect.succeed(Option(1)).optional().some() is the inverse
//

//
// POC
//

export declare namespace HKT {
  const F: unique symbol;
  type F = typeof F;
  const R: unique symbol;
  type R = typeof R;
  const E: unique symbol;
  type E = typeof E;
  const A: unique symbol;
  type A = typeof A;
  const T: unique symbol;
  type T = typeof T;
  type _R<X extends HKT> = X extends { [R]?: (_: infer R) => void; } ? R : never;
  type _E<X extends HKT> = X extends { [E]?: () => infer E; } ? E : never;
  type _A<X extends HKT> = X extends { [A]?: () => infer A; } ? A : never;

  /**
   * @tsplus type Kind
   */
  type Kind<F extends HKT, R, E, A> = (F & {
    [F]?: F;
    [R]?: (_: R) => void;
    [E]?: () => E;
    [A]?: () => A;
  }) extends { [T]?: infer X; } ? X : {
    [F]?: F;
    [R]?: (_: R) => void;
    [E]?: () => E;
    [A]?: () => A;
  };
}

export interface HKT {
  [HKT.F]?: HKT;
  [HKT.R]?: (_: never) => void;
  [HKT.E]?: () => unknown;
  [HKT.A]?: () => unknown;
  [HKT.T]?: unknown;
}

//
// TypeClasses
//

/**
 * @tsplus type TypeClass
 */
export interface TypeClass<F extends HKT> {
  [HKT.F]?: F;
}

/**
 * @tsplus type Functor
 */
export interface Functor<F extends HKT> extends TypeClass<F> {
  map<R, E, A, B>(self: HKT.Kind<F, R, E, A>, f: (a: A) => B): HKT.Kind<F, R, E, B>;
}

/**
 * @tsplus type Pointed
 */
export interface Pointed<F extends HKT> extends Functor<F> {
  of<A>(a: A): HKT.Kind<F, unknown, never, A>;
}

/**
 * @tsplus type Applicative
 */
export interface Applicative<F extends HKT> extends Pointed<F> {
  ap<R, E, B, A, R1, E1>(self: HKT.Kind<F, R, E, (a: A) => B>, a: HKT.Kind<F, R1, E1, A>): HKT.Kind<F, R, E, B>;
}

/**
 * @tsplus fluent Kind map
 * @tsplus given F
 */
export function map<F extends HKT, R, E, A, B>(
  self: HKT.Kind<F, R, E, A>,
  f: (a: A) => B,
  F: Functor<F>
): HKT.Kind<F, R, E, B> {
  return F.map(self, f);
}

/**
 * @tsplus fluent Kind ap
 * @tsplus given F
 */
export function ap<F extends HKT, R, E, B, A, R1, E1>(
  self: HKT.Kind<F, R, E, (a: A) => B>,
  a: HKT.Kind<F, R1, E1, A>,
  F: Applicative<F>
): HKT.Kind<F, R, E, B> {
  return F.ap(self, a);
}

//
// Types
//

interface EffectId extends Effect<any, any, any> {}

interface Effect<R, E, A> extends HKT {
  _tag: "Effect";
  [HKT.F]?: EffectId;
  [HKT.R]?: (_: R) => void;
  [HKT.E]?: () => E;
  [HKT.A]?: () => A;
  [HKT.T]?: Effect<HKT._R<this>, HKT._E<this>, HKT._A<this>>;
}

export type X = [Effect<{ a: string; }, "err-a", "a"> | Effect<{ b: string; }, "err-b", "b">] extends
  [Effect<infer R, infer E, infer A>] ? Effect<R, E, A> : never;

declare const EffectApplicative: Applicative<EffectId>;

declare function succeed<A>(a: A): Effect<unknown, never, A>;

/**
 * @tsplus fluent Array mapM
 * @tsplus given F
 */
export function mapM<A, F extends HKT, R, E, B>(
  self: Collection<A>,
  f: (a: A) => HKT.Kind<F, R, E, B>,
  F: Applicative<F>
): HKT.Kind<F, R, E, Chunk<B>> {
  return self.reduce(
    F.of(Chunk.empty<B>()),
    (fbs, a) => fbs.map((bs) => (b: B) => bs.append(b), F).ap(f(a), F)
  );
}

export const ok = [0, 1, 2].mapM((n) => succeed(`${n + 1}`), EffectApplicative);

interface MaybeId extends Maybe<any> {}

interface Maybe<A> extends HKT {
  _tag: "Maybe";
  [HKT.F]?: MaybeId;
  [HKT.R]?: (_: unknown) => void;
  [HKT.E]?: () => never;
  [HKT.A]?: () => A;
  [HKT.T]?: Maybe<HKT._A<this>>;
}

//
// Usage
//

/**
 * @tsplus given F
 */
export function addOne<F extends HKT, R, E>(
  self: HKT.Kind<F, R, E, number>,
  F: Functor<F>
): HKT.Kind<F, R, E, number> {
  return self.map((n) => n + 1, F);
}

export const A = addOne(succeed(0), EffectApplicative);
// @ts-expect-error
export const B = addOne(succeed(`0`), EffectApplicative);

export const res = mapM([0], (n) => succeed(`${n + 1}`), EffectApplicative);

export interface ArrayID extends Array<any> {}
declare global {
  interface Array<T> extends HKT {
    [HKT.F]?: ArrayID;
    [HKT.R]?: (_: unknown) => void;
    [HKT.E]?: () => never;
    [HKT.A]?: () => T;
    [HKT.T]?: Array<HKT._A<this>>;
  }
}

export const ArrayFunctor: Functor<ArrayID> = {
  map: (self, f) => self.map(f)
};

export const addOneArr = addOne([0, 1, 2], ArrayFunctor);
