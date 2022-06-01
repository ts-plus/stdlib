import { Annotated } from "@tsplus/stdlib/prelude/Recursive/Annotated"

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
  export type Fn<F extends HKT, Z> = (r: HKT.Kind<F, unknown, unknown, Z>) => Z
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

type Algebra<F, Z> = Recursive.Fn<F, Z>
type Zlgebra<F, Z> = (z: Z, r: HKT.Kind<F, unknown, unknown, Z>) => Z

/**
 * @tsplus fluent Recursive fold
 */
export function fold_<F extends HKT, Z>(
  self: Recursive<F>,
  F: Covariant<F>,
  f: Algebra<F, Z>
): Z {
  return go(self)

  function go(term: Recursive<F>): Z {
    return f(F.map(go)(term.unfix()))
  }
}
/**
 * @tsplus static Recursive/Ops fold
 */
export const fold = Pipeable(fold_)

/**
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
 * @tsplus static Recursive/Ops foldDown
 */
export declare function foldDown<F extends HKT>(
  F: ForEach<F>
): <Z>(z: Z) => (f: Zlgebra<F, Z>) => (term: Recursive<F>) => Z
