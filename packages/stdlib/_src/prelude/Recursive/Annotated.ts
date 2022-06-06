import type { Recursive } from "@tsplus/stdlib/prelude/Recursive"

/**
 * @tsplus type Recursive/Annotated
 * @tsplus companion Recursive/Annotated/Ops
 */
export class Annotated<F extends HKT, A> implements Recursive<F> {
  constructor(
    readonly caseValue: HKT.Kind<F, unknown, never, Annotated<F, A>>,
    readonly annotations: A
  ) {}
}

export declare namespace Annotated {
  /**
   * A function operating on a single level of a recursive structure,
   * with its recursive terms replaced by a value *and* an annotation, which
   * represents the value computed for each child.  aka `Course-of-Value (CV)Algebra`
   */
  export type Fn<F extends HKT, Z> = (
    r: HKT.Kind<F, unknown, unknown, Annotated<F, Z>>
  ) => Z
}

/**
 * @tsplus fluent Recursive/Annotated unfix
 * @tsplus static Recursive/Annotated/Ops unfix
 */
export function unfix<F extends HKT, A>({
  caseValue
}: Annotated<F, A>): HKT.Kind<F, unknown, unknown, Annotated<F, A>> {
  return caseValue
}

/**
 * @tsplus static Recursive/Annotated/Ops __call
 * @tsplus static Recursive/Annotated/Ops make
 */
export function make<F extends HKT, A>(
  caseValue: HKT.Kind<F, unknown, never, Annotated<F, A>>,
  annotations: A
): Annotated<F, A> {
  return new Annotated(caseValue, annotations)
}
