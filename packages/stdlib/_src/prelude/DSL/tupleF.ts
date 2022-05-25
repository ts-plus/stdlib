import { curried } from "@tsplus/stdlib/prelude/DSL/_internal/curried"

const tupleConstructors: Record<number, (a: unknown) => unknown> = {}

function getTupleConstructor(len: number): (a: unknown) => any {
  // eslint-disable-next-line no-prototype-builtins
  if (!tupleConstructors.hasOwnProperty(len)) {
    tupleConstructors[len] = curried((...t: any[]) => t, len - 1, [])
  }
  return tupleConstructors[len]!
}

/**
 * @tsplus static DSL tupleF
 */
export const tupleF = <F extends HKT>(F: Apply<F>) =>
  <T extends Array<HKT.Kind<F, any, any, unknown>>>(
    ...args: T
  ): HKT.Kind<
    F,
    HKT.Infer<F, "R", T[number]>,
    HKT.Infer<F, "E", T[number]>,
    {
      [K in keyof T]: [T[K]] extends [HKT.Kind<F, any, any, infer A>] ? A : never
    }
  > => {
    const ap = DSL.apF(F)
    const len = args.length
    const f = getTupleConstructor(len)
    let fas = F.map(f)(args[0]!)
    for (let i = 1; i < len; i++) {
      fas = ap(args[i]!)(fas)
    }
    return fas
  }
