/**
 * @tsplus type Select
 */
export interface Select<F extends HKT> extends HKT.Typeclass<F> {
  readonly select: <R2, E2, A, B>(
    fab: HKT.Kind<F, R2, E2, (a: A) => B>
  ) => <R, E, B2>(
    fa: HKT.Kind<F, R, E, Either<A, B2>>
  ) => HKT.Kind<F, R2 & R, E2 | E, B | B2>
}

/**
 * @tsplus type Selective
 */
export type Selective<F extends HKT> = Select<F> & Covariant<F> & Any<F>

/**
 * @tsplus type SelectiveMonad
 */
export type SelectiveMonad<F extends HKT> = Selective<F> & Monad<F>

/**
 * @tsplus type Select/Ops
 */
export interface SelectOps {}
export const Select: SelectOps = {}

/**
 * @tsplus static Select/Ops monad
 */
export function monadF<F extends HKT>(F: Monad<F>): SelectiveMonad<F> {
  const succeedF = DSL.succeedF(F)
  const flatMapF_ = DSL.flatMapF_(F)
  return HKT.instance<SelectiveMonad<F>>({
    ...F,
    select: <R2, E2, A, B>(fab: HKT.Kind<F, R2, E2, (a: A) => B>) =>
      <R, E, B2>(
        fa: HKT.Kind<F, R, E, Either<A, B2>>
      ): HKT.Kind<F, R2 & R, E2 | E, B | B2> =>
        flatMapF_(fa, (either) =>
          either.fold(
            (a) => F.map((g: (a: A) => B) => g(a))(fab),
            (b) => succeedF<B | B2, R & R2, E | E2>(b)
          ))
  })
}

/**
 * @tsplus static Select/Ops applicative
 */
export function applicativeF<F extends HKT>(F: Applicative<F>): Selective<F> {
  return HKT.instance<Selective<F>>({
    ...F,
    select: <R2, E2, A, B>(fab: HKT.Kind<F, R2, E2, (a: A) => B>) =>
      <R, E, B2>(fa: HKT.Kind<F, R, E, Either<A, B2>>): HKT.Kind<F, R2 & R, E2 | E, B | B2> => {
        const both = F.both(fab)(fa)
        return F.map(([ea, f]: readonly [Either<A, B2>, (a: A) => B]) => ea.fold(f, identity))(both)
      }
  })
}

/**
 * @tsplus static Select/Ops branchF
 */
export function branchF<F extends HKT>(F: Selective<F>) {
  return <R2, E2, A, D1, R3, E3, B, D2>(
    left: HKT.Kind<F, R2, E2, (a: A) => D1>,
    right: HKT.Kind<F, R3, E3, (a: B) => D2>
  ) =>
    <R, E>(
      fe: HKT.Kind<F, R, E, Either<A, B>>
    ): HKT.Kind<F, R & R2 & R3, E | E2 | E3, D1 | D2> => {
      const mapped = F.map((either: Either<A, B>) => either.map(Either.left))(fe)
      const selected = F.select<R2, E2, A, Either<B, D1>>(
        F.map((fac: (a: A) => D1) => (a: A) => Either.right(fac(a)))(left)
      )(mapped)
      return F.select(right)(selected)
    }
}

/**
 * @tsplus static Select/Ops ifF
 */
export function ifF<F extends HKT>(F: Selective<F>) {
  return <R2, E2, A, R3, E3, B>(
    then_: HKT.Kind<F, R2, E2, A>,
    else_: HKT.Kind<F, R3, E3, B>
  ) =>
    <S, R, E>(
      if_: HKT.Kind<F, R, E, boolean>
    ): HKT.Kind<F, R & R2 & R3, E | E2 | E3, A | B> => {
      const mapped = F.map(
        (b: boolean) => (b ? Either.left(undefined) : Either.right(undefined))
      )(if_)
      return branchF(F)(
        F.map((a: A) => () => a)(then_),
        F.map((b: B) => () => b)(else_)
      )(mapped)
    }
}

/**
 * @tsplus static Select/Ops whenF
 */
export function whenF<F extends HKT>(F: Selective<F>) {
  const succeedF = DSL.succeedF(F)
  return <R2, E2>(act: HKT.Kind<F, R2, E2, void>) =>
    <R, E>(if_: HKT.Kind<F, R, E, boolean>): HKT.Kind<F, R & R2, E | E2, void> =>
      ifF(F)(act, succeedF(undefined))(if_)
}
