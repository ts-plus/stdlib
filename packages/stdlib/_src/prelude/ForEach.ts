import type { CovariantComposition } from "@tsplus/stdlib/prelude/Covariant";

/**
 * @tsplus type ForEach
 */
export type ForEach<F extends HKT> = {
  readonly Law: {
    readonly ForEach: "ForEach";
  };
  readonly forEachF: ForEach.Fn<F>;
} & Covariant<F>;

/**
 * @tsplus type ForEach/Ops
 */
export interface ForEachOps {}
export const ForEach: ForEachOps = {};

/**
 * @tsplus type ForEachComposition
 */
export type ForEachComposition<F extends HKT, G extends HKT> = {
  readonly Law: {
    readonly ForEach: "ForEach";
  };
  readonly forEachF: ForEach.CompositionFn<F, G>;
} & CovariantComposition<F, G>;

export declare namespace ForEach {
  export interface Fn<F extends HKT> {
    <G extends HKT>(G: IdentityBoth<G> & Covariant<G>): <GR, GE, A, B>(
      f: (a: A) => HKT.Kind<G, GR, GE, B>
    ) => <FR, FE>(
      fa: HKT.Kind<F, FR, FE, A>
    ) => HKT.Kind<G, GR, GE, HKT.Kind<F, FR, FE, B>>;
  }

  export interface Fn_<F extends HKT> {
    <G extends HKT, FR, FE, A>(
      fa: HKT.Kind<F, FR, FE, A>,
      G: IdentityBoth<G> & Covariant<G>
    ): <GK, GQ, GW, GS, GR, GE, B>(
      f: (a: A) => HKT.Kind<G, GR, GE, B>
    ) => HKT.Kind<G, GR, GE, HKT.Kind<F, FR, FE, B>>;
  }

  export interface CompositionFn<F extends HKT, G extends HKT> {
    <H extends HKT>(H: IdentityBoth<H> & Covariant<H>): <HR, HE, A, B>(
      f: (a: A) => HKT.Kind<H, HR, HE, B>
    ) => <FR, FE, GR, GE>(
      fa: HKT.Kind<F, FR, FE, HKT.Kind<G, GR, GE, A>>
    ) => HKT.Kind<H, HR, HE, HKT.Kind<F, FR, FE, HKT.Kind<G, GR, GE, B>>>;
  }
}

/**
 * @tsplus static ForEach/Ops implementForEachF
 */
export function implementForEachF<F extends HKT>(): (
  i: <N extends string, R, E, A, B, G extends HKT>(_: {
    A: A;
    B: B;
    G: G;
    N: N;
    R: R;
    E: E;
  }) => (
    G: IdentityBoth<G> & Covariant<G>
  ) => (
    f: (a: A) => HKT.Kind<G, R, E, B>
  ) => (fa: HKT.Kind<F, R, E, A>) => HKT.Kind<G, R, E, HKT.Kind<F, R, E, B>>
) => ForEach.Fn<F>;
export function implementForEachF() {
  return (i: any) => i();
}

/**
 * @tsplus static ForEach/Ops getComposition
 */
export function getComposition<F extends HKT, G extends HKT>(
  F_: ForEach<F>,
  G_: ForEach<G>
): ForEachComposition<F, G> {
  return HKT.instance<ForEachComposition<F, G>>({
    ...Covariant.getComposition(F_, G_),
    forEachF: (H) => (f) => (fa) => pipe(fa, F_.forEachF(H)(G_.forEachF(H)(f)))
  });
}

/**
 * @tsplus static ForEach/Ops sequenceF
 */
export function sequenceF<T extends HKT>(T: ForEach<T>) {
  return <F extends HKT>(
    App: Covariant<F> & IdentityBoth<F>
  ): <R, E, FR, FE, A>(_: HKT.Kind<T, R, E, HKT.Kind<F, FR, FE, A>>) => HKT.Kind<F, FR, FE, HKT.Kind<T, R, E, A>> => {
    const traverse = T.forEachF(App);
    return traverse(identity);
  };
}
