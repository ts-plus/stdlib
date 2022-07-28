/**
 * @tsplus static Eval.Ops struct
 */
export function struct<NER extends Record<string, Eval<any>>>(
  r: EnforceNonEmptyRecord<NER> & Record<string, Eval<any>>,
  __tsplusTrace?: string
): Eval<
  {
    [K in keyof NER]: [NER[K]] extends [Eval<infer A>] ? A : never
  }
> {
  const entries = Object.entries(r)
  if (entries.length === 1) {
    const [key, value] = entries[0]!
    // @ts-expect-error
    return value.map((a) => ({ [key]: a }))
  }
  // @ts-expect-error
  return Eval.suspend(() => {
    const [k1, e1] = entries[0]!
    const init = e1.map((a) => ({ [k1]: a }))
    const rest = entries.slice(1)
    return rest.reduce(
      (acc: Eval<{ [k: string]: any }>, [k2, e2]) =>
        acc.zipWith(e2.map((b) => ({ [k2]: b })), (a, b) => ({ ...a, ...b })),
      init
    )
  })
}
