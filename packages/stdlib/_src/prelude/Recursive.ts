import { constant } from "@tsplus/stdlib/data/Function"
import { Annotated } from "@tsplus/stdlib/prelude/Recursive/Annotated"
import type { Unfolder } from "@tsplus/stdlib/prelude/Recursive/Unfolder"

export * from "@tsplus/stdlib/prelude/Recursive/Annotated"

/**
 * @tsplus type Recursive
 */
export interface Recursive<F extends HKT, E = unknown, R = unknown> {
  readonly caseValue: HKT.Kind<F, R, E, Recursive<F, E, R>>
}

/**
 * @tsplus type Recursive/Ops
 */
export interface RecursiveOps {
  $: RecursiveAspects
}
export const Recursive: RecursiveOps = {
  $: {}
}
/**
 * @tsplus type Recursive/Aspects
 */
export interface RecursiveAspects {}

export declare namespace Recursive {
  /**
   * A function operating on a single level of a recursive structure, with its recursive term(s) replaced by the result of the function's application on each child. a.k.a `F-Algebra`
   */
  export type Fn<F extends HKT, Z, E = unknown, R = unknown> = (r: HKT.Kind<F, R, E, Z>) => Z

  export type FnM<F extends HKT, M extends HKT, Z, E = unknown, R = unknown> = (
    r: HKT.Kind<F, R, E, Z>
  ) => HKT.Kind<M, R, E, Z>

  /**
   * A function operating on a single level of a recursive structure.
   * The value of the computation at the previous step is provided, along
   * with the *original* recursive term.  This is for breadth-first (left) folds
   */
  export type FoldDownFn<F extends HKT, Z> = (accum: Z, r: Recursive<F>) => Z
}
/**
 * @tsplus static Recursive/Aspects unfix
 * @tsplus pipeable Recursive unfix
 */
export function unfix<F extends HKT>() {
  return (
    self: Recursive<F>
  ): HKT.Kind<F, unknown, unknown, Recursive<F>> => self.caseValue
}

/**
 * @tsplus static Recursive/Ops __call
 * @tsplus static Recursive/Ops make
 * @tsplus static Recursive/Ops fix
 */
export function fix<F extends HKT, E = unknown, R = unknown>(
  caseValue: HKT.Kind<F, R, E, Recursive<F, E, R>>
): Recursive<F, E, R> {
  return { caseValue }
}

/**
 * Use a `Covariant<F>` and a `Recursive.Fn` function to perform a *depth-first* reduction of the `Recursive<F>` structure.  The supplied function will receive the current term with all of its recursive elements replaced by the computed value of its children, i.e. a _catamorphism_
 *
 * @tsplus static Recursive/Aspects fold
 * @tsplus pipeable Recursive fold
 */
export function fold<F extends HKT, Z, E = unknown, R = unknown>(
  F: Covariant<F>,
  f: Recursive.Fn<F, Z, E, R>
) {
  return (self: Recursive<F, E, R>) => go(self)
  function go(term: Recursive<F, E, R>): Z {
    return f(F.map(go)(term.caseValue))
  }
}

/**
 * Monadic fold over a datstructure `R` with an algebra `(r: Recursive<Z>) => M<Z>` eventually returning an `M<Z>`
 *
 * @tsplus static Recursive/Aspects foldM
 * @tsplus pipeable Recursive foldM
 */
export function foldM<F extends HKT, M extends HKT, Z, E = unknown, R = unknown>(
  F: ForEach<F> & Covariant<F>,
  M: IdentityBoth<M> & Monad<M>,
  f: Recursive.FnM<F, M, Z, E, R>
) {
  const mapM = F.forEachF(M)
  const chain = DSL.flatMapF(M)
  const go = (term: Recursive<F, E, R>): HKT.Kind<M, R, E, Z> =>
    pipe(
      term.caseValue,
      mapM(go),
      chain(f)
    )

  return (self: Recursive<F, E, R>) => go(self)
}

/**
 * Use a `Covariant<F>` and a `Annotated.Fn` function to perform a *depth-first* reduction of the `Recursive<F>` structure. The supplied function will receive the current term with all of its recursive elements replaced with *both* the computed value of the sub-structure *and* the value of the computation for all of _its_ children.
 * i.e. _histomorphism_
 *
 * @tsplus static Recursive/Aspects foldAnnotated
 * @tsplus pipeable Recursive foldAnnotated
 */
export function foldAnnotated<F extends HKT, Z>(
  F: Covariant<F>,
  f: Annotated.Fn<F, Z>
) {
  return (self: Recursive<F>) => foldAnnotated_(self, F, f)
}

function foldAnnotated_<F extends HKT, Z>(
  self: Recursive<F>,
  F: Covariant<F>,
  f: Annotated.Fn<F, Z>
): Z {
  function annotate(recursive: Recursive<F>): Annotated<F, Z> {
    const calc = F.map(annotate)(recursive.caseValue)
    return Annotated(calc, f(calc))
  }
  return annotate(self).annotations
}
/**
 * Use a `Folder<F>`, an initial value `Z` and a `Recursive.FoldDownFn<F, Z>` function to perform a breadth-first reduction of a `Recursive<F>` to a summary value `Z`.
 *
 * @tsplus static Recursive/Aspects foldDown
 * @tsplus pipeable Recursive foldDown
 */
export function foldDown<F extends HKT, Z>(
  F: Foldable<F>,
  z: Z,
  f: Recursive.FoldDownFn<F, Z>
) {
  return (self: Recursive<F>): Z => {
    const next = f(z, self)
    const iter = (z0: Z, r: Recursive<F>) => r.foldDown(F, z0, f)
    return pipe(
      self.caseValue,
      F.reduce(next, iter)
    )
  }
}
/**
 * @tsplus static Recursive/Aspects foldDownSome
 * @tsplus pipeable Recursive foldDownSome
 */
export function foldDownSome<F extends HKT, Z>(
  F: Foldable<F>,
  z: Z,
  pf: (accum: Z, current: HKT.Kind<F, unknown, unknown, Recursive<F>>) => Maybe<Z>
) {
  return (self: Recursive<F>) =>
    self.foldDown(F, z, (accum, recursive) =>
      pf(accum, recursive.caseValue).fold(
        constant(accum),
        identity
      ))
}
/**
 * @tsplus fluent Recursive/Aspects foldUp
 * @tsplus pipeable Recursive foldUp
 */
export function foldUp<F extends HKT, Z>(
  F: Foldable<F>,
  z: Z,
  f: Recursive.FoldDownFn<F, Z>
) {
  return (self: Recursive<F>): Z =>
    pipe(
      self.caseValue,
      F.reduceRight(z, (r: Recursive<F>, accum) => r.foldUp(F, accum, f)),
      (z0) => f(z0, self)
    )
}

/**
 * Use a `Covariant<F>` and an `Unfolder.Fn<F, Z>` function to generate a Recurisve<F> structure.  The `unfolder` is non-recursive and generates a single level of the recursive structure.
 * i.e. _anamorphism_
 *
 * @tsplus static Recursive/Ops unfold
 */
export function unfold<F extends HKT, Z, E = unknown, R = unknown>(
  F: Covariant<F>,
  unfolder: Unfolder.Fn<F, Z, E, R>
): (a: Z) => Recursive<F, E, R> {
  return function self(a): Recursive<F, E, R> {
    return Recursive(F.map(self)(unfolder(a)))
  }
}
