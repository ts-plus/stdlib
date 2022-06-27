import { constant } from "@tsplus/stdlib/data/Function"
import { Annotated } from "@tsplus/stdlib/prelude/Recursive/Annotated"
import type { Unfolder } from "@tsplus/stdlib/prelude/Recursive/Unfolder"

export * from "@tsplus/stdlib/prelude/Recursive/Annotated"

/**
 * @tsplus type Recursive
 */
export interface Recursive<F extends HKT> {
  readonly caseValue: HKT.Kind<F, unknown, never, Recursive<F>>
}

/**
 * @tsplus type Recursive/Ops
 */
export interface RecursiveOps {}
export const Recursive: RecursiveOps = {}

export declare namespace Recursive {
  /**
   * A function operating on a single level of a recursive structure,
   * with its recursive term(s) replaced by the result of the function's application
   * on each child. a.k.a `F-Algebra`
   */
  export type Fn<F extends HKT, Z, R = unknown, E = unknown> = (r: HKT.Kind<F, R, E, Z>) => Z

  export type FnM<F extends HKT, M extends HKT, Z, R = unknown, E = unknown> = (r: HKT.Kind<F, R, E, Z>) => HKT.Kind<M, R, E, Z>

  /**
   * A function operating on a single level of a recursive structure.
   * The value of the computation at the previous step is provided, along
   * with the *original* recursive term.  This is for breadth-first (left) folds
   */
  export type FoldDownFn<F extends HKT, Z> = (accum: Z, r: Recursive<F>) => Z
}

/**
 * @tsplus fluent Recursive unfix
 */
export function unfix<F extends HKT>({
  caseValue
}: Recursive<F>): HKT.Kind<F, unknown, unknown, Recursive<F>> {
  return caseValue
}

/**
 * @tsplus static Recursive/Ops __call
 */
export function fix<F extends HKT>(
  caseValue: HKT.Kind<F, unknown, never, Recursive<F>>
): Recursive<F> {
  return { caseValue }
}

/**
 * Use a `Covariant<F>` and a `Recursive.Fn` function to perform a *depth-first* reduction of the `Recursive<F>` structure.  The supplied function will receive the current term with all of its recursive elements replaced by the computed value of its children, i.e. a _catamorphism_
 *
 * @tsplus fluent Recursive fold
 */
export function fold_<F extends HKT, R, E, Z>(
  self: Recursive<F>,
  F: Covariant<F>,
  f: Recursive.Fn<F, Z, R, E>
): Z {
  return go(self)
  function go(term: Recursive<F>): Z {
    return f(F.map(go)(term.caseValue))
  }
}
/**
 * @tsplus static Recursive/Ops fold
 */
export const fold = Pipeable(fold_)

/**
 * Monadic fold over a datstructure `R` with an algebra `(r: Recursive<Z>) => M<Z>` eventually returning an `M<Z>`
 *
 * @tsplus fluent Recursive foldM
 */
export function foldM_<F extends HKT, M extends HKT, Z, R = unknown>(
  self: Recursive<F>,
  F: ForEach<F> & Covariant<F>,
  M: IdentityBoth<M> & Monad<M>,
  f: Recursive.FnM<F, M, Z>
): HKT.Kind<M, R, unknown, Z> {
  const mapM = F.forEachF(M)
  const chain = DSL.flatMapF(M)
  
  return go(self)
  function go(term: Recursive<F>): HKT.Kind<M, R, unknown, Z> {
    return pipe(
      term.caseValue,
      mapM(go),
      chain(f)
    )
  }
}
/**
 * Use a `Covariant<F>` and a `Annotated.Fn` function to perform a *depth-first* reduction of the `Recursive<F>` structure.
 * The supplied function will receive the current term with all of its recursive elements replaced with *both* the computed value of the sub-structure *and* the value of the computation for all of _its_ children.
 * i.e. _histomorphism_
 *
 * @tsplus fluent Recursive foldAnnotated
 */
export function foldAnnotated_<F extends HKT, Z>(
  self: Recursive<F>,
  F: Covariant<F>,
  f: Annotated.Fn<F, Z>
): Z {
  function annotate(recursive: Recursive<F>): Annotated<F, Z> {
    return Annotated(
      F.map(annotate)(recursive.caseValue),
      foldAnnotated_(recursive, F, f)
    )
  }
  return f(F.map(annotate)(self.unfix()))
}

/**
 * @tsplus static Recursive/Ops foldAnnotated
 */
export const foldAnnotated = Pipeable(foldAnnotated_)

/**
 * Use a `Folder<F>`, an initial value `Z` and a `Recursive.FoldDownFn<F, Z>` function to perform a breadth-first reduction of a `Recursive<F>` to a summary value `Z`.
 *
 * @tsplus fluent Recursive foldDown
 */
export function foldDown_<F extends HKT, Z>(
  self: Recursive<F>,
  F: Foldable<F>,
  z: Z,
  f: Recursive.FoldDownFn<F, Z>
): Z {
  return F.reduce(f(z, self), (z0, r: Recursive<F>) => r.foldDown(F, z0, f))(self.unfix())
}

/**
 * @tsplus static Recursive/Ops foldDown
 */
export const foldDown = Pipeable(foldDown_)

/**
 * @tsplus fluent Recursive foldDownSome
 */
export function foldDownSome_<F extends HKT, Z>(
  self: Recursive<F>,
  F: Foldable<F>,
  z: Z,
  pf: (accum: Z, current: HKT.Kind<F, unknown, unknown, Recursive<F>>) => Maybe<Z>
): Z {
  return self.foldDown(F, z, (accum, recursive) =>
    pf(accum, recursive.caseValue).fold(
      constant(accum),
      identity
    ))
}
/**
 * @tsplus static Recursive/Ops foldDownSome
 */
export const foldDownSome = Pipeable(foldDownSome_)

/**
 * @tsplus fluent Recursive foldUp
 */
export function foldUp_<F extends HKT, Z>(
  self: Recursive<F>,
  F: Foldable<F>,
  z: Z,
  f: Recursive.FoldDownFn<F, Z>
): Z {
  const ff = F.reduceRight(z, (r: Recursive<F>, accum) => r.foldUp(F, accum, f))
  void ff
  return pipe(
    self.caseValue,
    ff,
    (z0) => f(z0, self)
  )
}
/**
 * @tsplus static Recursive/Ops foldUp
 */
export const foldUp = Pipeable(foldUp_)

/**
 * Use a `Covariant<F>` and an `Unfolder.Fn<F, Z>` function to generate a Recurisve<F> structure.  The `unfolder` is non-recursive and generates a single level of the recursive structure.
 * i.e. _anamorphism_
 *
 * @tsplus static Recursive/Ops unfold
 */
export function unfold<F extends HKT, Z>(F: Covariant<F>, unfolder: Unfolder.Fn<F, Z>): (a: Z) => Recursive<F> {
  return function self(a): Recursive<F> {
    return Recursive(F.map(self)(unfolder(a)))
  }
}
