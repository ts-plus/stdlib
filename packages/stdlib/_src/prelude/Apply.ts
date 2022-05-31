/**
 * @tsplus type Apply
 */
export type Apply<F extends HKT> = AssociativeBoth<F> & Covariant<F>

/**
 * @tsplus fluent Apply ap
 */
export function ap<F extends HKT, R, E, A, R2, E2, B>(
  F: Apply<F>,
  fab: HKT.Kind<F, R, E, (a: A) => B>,
  fa: HKT.Kind<F, R2, E2, A>
): HKT.Kind<F, R & R2, E | E2, B> {
  return F.map(F.both(fa, fab), ({ tuple: [a, f] }: Tuple<[A, (a: A) => B]>) => f(a))
}

/**
 * @tsplus fluent Apply zip
 */
export function zip<F extends HKT, R, E, A, R2, E2, B>(
  F: Apply<F>,
  fa: HKT.Kind<F, R, E, A>,
  fb: HKT.Kind<F, R2, E2, B>
): HKT.Kind<F, R & R2, E | E2, Tuple<[A, B]>> {
  return F.both(fa, fb)
}

const tupleConstructors: Record<number, (a: unknown) => unknown> = {}

function getTupleConstructor(len: number): (a: unknown) => any {
  // eslint-disable-next-line no-prototype-builtins
  if (!tupleConstructors.hasOwnProperty(len)) {
    tupleConstructors[len] = curried((...t: any[]) => t, len - 1, [])
  }
  return tupleConstructors[len]!
}

function curried(f: Function, n: number, acc: ReadonlyArray<unknown>) {
  return function(x: unknown) {
    const combined = acc.concat([x])
    // eslint-disable-next-line prefer-spread
    return n === 0 ? f.apply(null, combined) : curried(f, n - 1, combined)
  }
}

/**
 * @tsplus fluent Apply tuple
 */
export function tuple<F extends HKT, T extends Array<HKT.Kind<F, any, any, unknown>>>(
  F: Apply<F>,
  ...args: T
): HKT.Kind<
  F,
  HKT.Infer<F, "R", T[number]>,
  HKT.Infer<F, "E", T[number]>,
  {
    [K in keyof T]: [T[K]] extends [HKT.Kind<F, any, any, infer A>] ? A : never
  }
> {
  const len = args.length
  const f = getTupleConstructor(len)
  let fas = F.map(args[0]!, f)
  for (let i = 1; i < len; i++) {
    fas = F.ap(fas, args[i]!)
  }
  // @ts-expect-error
  return fas
}

function getRecordConstructor(keys: ReadonlyArray<string>) {
  const len = keys.length
  return curried(
    (...args: ReadonlyArray<unknown>) => {
      const r: Record<string, unknown> = {}
      for (let i = 0; i < len; i++) {
        r[keys[i]!] = args[i]
      }
      return r
    },
    len - 1,
    []
  )
}

/**
 * @tsplus fluent Apply struct
 */
export function struct<F extends HKT, NER extends Record<string, HKT.Kind<F, any, any, unknown>>>(
  F: Apply<F>,
  r: EnforceNonEmptyRecord<NER>
): HKT.Kind<
  F,
  HKT.Infer<F, "R", NER[keyof NER]>,
  HKT.Infer<F, "E", NER[keyof NER]>,
  { [K in keyof NER]: HKT.Infer<F, "A", NER[K]> }
> {
  const keys = Object.keys(r)
  const len = keys.length
  const f = getRecordConstructor(keys)
  let fr = F.map(r[keys[0]!]!, f)
  for (let i = 1; i < len; i++) {
    fr = F.ap(fr, r[keys[i]!]!)
  }
  // @ts-expect-error
  return fr
}
