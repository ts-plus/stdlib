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
   * A function operating on a single level of a recursive structure, with its recursive term(s)
   * replaced by the result of the function's application on each child. a.k.a `F-Algebra`
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
export function unfixRecursive<F extends HKT>() {
  return (
    self: Recursive<F>
  ): HKT.Kind<F, unknown, unknown, Recursive<F>> => self.caseValue
}

/**
 * @tsplus static Recursive/Ops __call
 * @tsplus static Recursive/Ops make
 * @tsplus static Recursive/Ops fix
 */
export function makeRecursive<F extends HKT, E = unknown, R = unknown>(
  caseValue: HKT.Kind<F, R, E, Recursive<F, E, R>>
): Recursive<F, E, R> {
  return { caseValue }
}
