/**
 * @tsplus type Match/Ops
 */
export interface MatchOps {
  $: MatchAspects
}
export const Match: MatchOps = {
  $: {}
}

/**
 * @tsplus type Match/Aspects
 */
export interface MatchAspects {}

/**
 * @tsplus static Match/Aspects pattern
 */
export const pattern: <N extends string>(
  n: N
) => {
  <
    X extends { [k in N]: string },
    K extends {
      [k in X[N]]: (
        _: Extract<X, { [_tag in N]: k }>,
        __: Extract<X, { [_tag in N]: k }>
      ) => any
    }
  >(
    _: K
  ): (m: X) => ReturnType<K[keyof K]>
  <
    X extends { [k in N]: string },
    K extends Partial<
      {
        [k in X[N]]: (
          _: Extract<X, { [_tag in N]: k }>,
          __: Extract<X, { [_tag in N]: k }>
        ) => any
      }
    >,
    H
  >(
    _:
      & K
      & {
        [k in X[N]]?: (
          _: Extract<X, { [_tag in N]: k }>,
          __: Extract<X, { [_tag in N]: k }>
        ) => any
      },
    __: (_: Exclude<X, { _tag: keyof K }>, __: Exclude<X, { _tag: keyof K }>) => H
  ): (m: X) => { [k in keyof K]: ReturnType<NonNullable<K[k]>> }[keyof K] | H
} = (n) =>
  ((_: any, d: any) =>
    (m: any) => {
      return (_[m[n]] ? _[m[n]](m, m) : d(m, m)) as any
    }) as any

/**
 * @tsplus static Match/Aspects tag
 */
export const matchTag = pattern("_tag")

/**
 * @tsplus static Match/Ops pattern
 */
export const pattern_: <N extends string>(
  n: N
) => {
  <
    X extends { [k in N]: string },
    K extends {
      [k in X[N]]: (
        _: Extract<X, { [_tag in N]: k }>,
        __: Extract<X, { [_tag in N]: k }>
      ) => any
    }
  >(
    m: X,
    _: K
  ): ReturnType<K[keyof K]>
  <
    X extends { [k in N]: string },
    K extends Partial<
      {
        [k in X[N]]: (
          _: Extract<X, { [_tag in N]: k }>,
          __: Extract<X, { [_tag in N]: k }>
        ) => any
      }
    >,
    H
  >(
    m: X,
    _:
      & K
      & {
        [k in X[N]]?: (
          _: Extract<X, { [_tag in N]: k }>,
          __: Extract<X, { [_tag in N]: k }>
        ) => any
      },
    __: (_: Exclude<X, { _tag: keyof K }>, __: Exclude<X, { _tag: keyof K }>) => H
  ): { [k in keyof K]: ReturnType<NonNullable<K[k]>> }[keyof K] | H
} = (n) =>
  ((m: any, _: any, d: any) => {
    return (_[m[n]] ? _[m[n]](m, m) : d(m, m)) as any
  }) as any

/**
 * @tsplus static Match/Ops tag
 */
export const matchTag_ = pattern_("_tag")

/**
 * @tsplus static Match/Aspects patternFor
 */
export const patternFor: <N extends string>(
  n: N
) => <X extends { [k in N]: string }>() => {
  <
    K extends {
      [k in X[N]]: (
        _: Extract<X, { [_tag in N]: k }>,
        __: Extract<X, { [_tag in N]: k }>
      ) => any
    }
  >(
    _: K
  ): (m: X) => ReturnType<K[keyof K]>
  <
    K extends Partial<
      {
        [k in X[N]]: (
          _: Extract<X, { [_tag in N]: k }>,
          __: Extract<X, { [_tag in N]: k }>
        ) => any
      }
    >,
    H
  >(
    _:
      & K
      & {
        [k in X[N]]?: (
          _: Extract<X, { [_tag in N]: k }>,
          __: Extract<X, { [_tag in N]: k }>
        ) => any
      },
    __: (_: Exclude<X, { _tag: keyof K }>, __: Exclude<X, { _tag: keyof K }>) => H
  ): (m: X) => { [k in keyof K]: ReturnType<NonNullable<K[k]>> }[keyof K] | H
} = (n) =>
  () =>
    ((_: any, d: any) =>
      (m: any) => {
        return (_[m[n]] ? _[m[n]](m, m) : d(m, m)) as any
      }) as any

/**
 * @tsplus static Match/Ops tagFor
 */
export const matchTagFor = patternFor("_tag")

/**
 * @tsplus static Match/Ops isAdtElement
 */
export function isAdtElement_<A extends { _tag: string }, K extends A["_tag"]>(
  tag: K,
  adt: A
): adt is Extract<A, { _tag: K }> {
  return adt["_tag"] === tag
}

/**
 * @tsplus static Match/Aspects isAdtElement
 */
export const isAdtElement = Pipeable(isAdtElement_)

/**
 * @tsplus static Match/Ops isGenericAdtElement
 */
export function isGenericAdtElement<T extends string>(
  _t: T
): <A extends { [k in T]: string }, K extends A[T]>(
  tag: K
) => (adt: A) => adt is Extract<A, { [k in T]: K }> {
  return <A extends { [k in T]: string }, K extends A[T]>(tag: K) =>
    (adt: A): adt is Extract<A, { [k in T]: K }> => adt[_t] === tag
}

/**
 * @tsplus static Match/Ops onAdtElement
 */
export function onAdtElement<A extends { _tag: string }, K extends A["_tag"], B>(
  tag: K,
  f: (_: Extract<A, { _tag: K }>) => B
): (adt: A) => Option<B> {
  return (adt: A) => {
    if (adt["_tag"] === tag) {
      return Option.some(f(adt as any))
    }
    return Option.none
  }
}

/**
 * @tsplus static Match/Ops onGenericAdtElement
 */
export function onGenericAdtElement<T extends string>(_t: T) {
  return <A extends { [k in T]: string }, K extends A[T], B>(
    tag: K,
    f: (_: Extract<A, { [k in T]: K }>) => B
  ) =>
    (adt: A): Option<B> => {
      if (adt[_t] === tag) {
        return Option.some(f(adt as any))
      }
      return Option.none
    }
}
