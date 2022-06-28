/**
 * Takes a function `Eval<A> => B` and return an `Eval<B>`
 *
 * @tsplus fluent Eval extend
 */
export function extend_<A, B>(self: Eval<A>, f: (fa: Eval<A>) => B): Eval<B> {
  return Eval.succeedNow(f(self))
}

/**
 * Takes a function `Eval<A> => B` and return an `Eval<B>`
 *
 * @tsplus static Eval/Aspects extend
 */
export const extend = Pipeable(extend_)
