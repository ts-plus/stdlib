/**
 * @tsplus type ChainRec
 */
export interface ChainRec<F extends HKT> extends Typeclass<F> {
  readonly Law: {
    readonly ChainRec: "ChainRec";
  };
  readonly chainRec: <A, B, R, E>(
    f: (a: A) => Kind<F, R, E, Either<A, B>>
  ) => (a: A) => Kind<F, R, E, B>;
}

/**
 * @tsplus type ChainRec/Ops
 */
export interface ChainRecOps {}
export const ChainRec: ChainRecOps = {};

/**
 * @tsplus static ChainRec/Ops tailRec
 */
export function tailRec<A, B>(a: A, f: (a: A) => Either<A, B>): B {
  let v = f(a);
  while (v._tag === "Left") {
    v = f(v.left);
  }
  return v.right;
}
