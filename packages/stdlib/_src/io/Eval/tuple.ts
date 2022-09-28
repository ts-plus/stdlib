import type { _A } from "@tsplus/stdlib/io/Eval/definition"

/**
 * @tsplus static Eval.Ops tuple
 */
export function tuple<EN extends readonly Eval<any>[]>(
  ...[e1, e2, ...es]: EN & {
    readonly 0: Eval<any>
    readonly 1: Eval<any>
  }
): Eval<
  Readonly<
    {
      [K in keyof EN]: [EN[K]] extends [Eval<infer A>] ? A : never
    }
  >
> {
  const init = e1.zip(e2)
  return es.reduce(
    (acc: Eval<any[]>, v) => acc.zipWith(v, (a, b) => [...a, b]),
    init
  )
}
