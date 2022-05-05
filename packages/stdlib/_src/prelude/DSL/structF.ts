import { curried } from "@tsplus/stdlib/prelude/DSL/_internal/curried";

function getRecordConstructor(keys: ReadonlyArray<string>) {
  const len = keys.length;
  return curried(
    (...args: ReadonlyArray<unknown>) => {
      const r: Record<string, unknown> = {};
      for (let i = 0; i < len; i++) {
        r[keys[i]!] = args[i];
      }
      return r;
    },
    len - 1,
    []
  );
}

/**
 * @tsplus static DSL structF
 */
export function structF<F extends HKT>(F: Apply<F>) {
  return <NER extends Record<string, HKT.Kind<F, any, any, unknown>>>(
    r: EnforceNonEmptyRecord<NER>
  ): HKT.Kind<
    F,
    HKT.Infer<F, "R", NER[keyof NER]>,
    HKT.Infer<F, "E", NER[keyof NER]>,
    { [K in keyof NER]: HKT.Infer<F, "A", NER[K]>; }
  > => {
    const ap = DSL.apF(F);
    const keys = Object.keys(r);
    const len = keys.length;
    const f = getRecordConstructor(keys);
    let fr = F.map(f)(r[keys[0]!]!);
    for (let i = 1; i < len; i++) {
      fr = ap(r[keys[i]!]!)(fr);
    }
    return fr;
  };
}
