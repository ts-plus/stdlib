/**
 * @tsplus type Select
 */
export interface Select<F extends HKT> extends HKT.TypeClass<F> {
  readonly select: <R, E, B2, R2, E2, A, B>(
    fa: HKT.Kind<F, R, E, Either<A, B2>>,
    fab: HKT.Kind<F, R2, E2, (a: A) => B>
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
export function monad<F extends HKT>(F: Monad<F>): SelectiveMonad<F> {
  return HKT.instance<SelectiveMonad<F>>({
    ...F,
    select: <R, E, B2, R2, E2, A, B>(fa: HKT.Kind<F, R, E, Either<A, B2>>, fab: HKT.Kind<F, R2, E2, (a: A) => B>) =>
      F.flatMap(
        fa,
        (either) =>
          either.fold(
            (a) => F.map(fab, (g) => g(a)) as HKT.Kind<F, R2 & R, E2 | E, B | B2>,
            (b) => F.succeed(b) as HKT.Kind<F, R2 & R, E2 | E, B | B2>
          )
      )
  })
}

/**
 * @tsplus static Select/Ops applicative
 */
export function applicative<F extends HKT>(F: Applicative<F>): Selective<F> {
  return HKT.instance<Selective<F>>({
    ...F,
    select: <R, E, B2, R2, E2, A, B>(
      fa: HKT.Kind<F, R, E, Either<A, B2>>,
      fab: HKT.Kind<F, R2, E2, (a: A) => B>
    ): HKT.Kind<F, R2 & R, E2 | E, B | B2> => {
      const both = F.both(fa, fab)
      return F.map(both, ({ tuple: [ea, f] }: Tuple<[Either<A, B2>, (a: A) => B]>) => ea.fold(f, identity))
    }
  })
}

/**
 * @tsplus fluent Selective branch
 */
export function branch<F extends HKT, R, E, R2, E2, A, D1, R3, E3, B, D2>(
  F: Selective<F>,
  fe: HKT.Kind<F, R, E, Either<A, B>>,
  left: HKT.Kind<F, R2, E2, (a: A) => D1>,
  right: HKT.Kind<F, R3, E3, (a: B) => D2>
): HKT.Kind<F, R & R2 & R3, E | E2 | E3, D1 | D2> {
  const mapped = F.map(fe, (either: Either<A, B>) => either.map(Either.left))
  const selected = F.select(
    mapped,
    F.map(left, (fac: (a: A) => D1) => (a: A) => Either.right(fac(a)))
  )
  return F.select(selected, right)
}

/**
 * @tsplus fluent Selective if
 */
export function cond<F extends HKT, R2, E2, A, R3, E3, B, R, E>(
  F: Selective<F>,
  if_: HKT.Kind<F, R, E, boolean>,
  then_: HKT.Kind<F, R2, E2, A>,
  else_: HKT.Kind<F, R3, E3, B>
): HKT.Kind<F, R & R2 & R3, E | E2 | E3, A | B> {
  const mapped = F.map(if_, (b: boolean) => (b ? Either.left(undefined) : Either.right(undefined)))
  return F.branch(
    mapped,
    F.map(then_, (a: A) => () => a),
    F.map(else_, (b: B) => () => b)
  )
}

/**
 * @tsplus fluent Selective when
 */
export function when<F extends HKT, R, E, R2, E2>(
  F: Selective<F>,
  if_: HKT.Kind<F, R, E, boolean>,
  act: HKT.Kind<F, R2, E2, void>
): HKT.Kind<F, R & R2, E | E2, void> {
  return F.if(if_, act, F.succeed(undefined))
}
