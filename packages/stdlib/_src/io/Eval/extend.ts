/**
 * Takes a function `Eval<A> => B` and return an `Eval<B>`
 *
 * @tsplus static Eval.Aspects extend
 * @tsplus pipeable Eval extend
 */
export function extend<A, B>(f: (fa: Eval<A>) => B) {
  return (self: Eval<A>): Eval<B> => Eval.succeedNow(f(self))
}
