/**
 * A Encoder<A> is a type representing the ability to identify when a value is of type A at runtime
 *
 * @tsplus type Encoder
 * @tsplus derive nominal
 */
export interface Encoder<in out A> {
  readonly encode: (a: A) => unknown
}

/**
 * @tsplus type EncoderOps
 */
export interface EncoderOps {
  <A>(f: (a: A) => unknown): Encoder<A>
}

/**
 * Creates a new Encoder
 */
export const Encoder: EncoderOps = (encode) => ({ encode })

//
// Implicits
//

/**
 * Encoder for `true`
 *
 * @tsplus implicit
 */
export const _true: Encoder<true> = Encoder((u) => u)

/**
 * Encoder for `false`
 *
 * @tsplus implicit
 */
export const _false: Encoder<false> = Encoder((u) => u)

/**
 * Encoder for a boolean
 *
 * @tsplus implicit
 */
export const boolean: Encoder<boolean> = Encoder((u) => u)

/**
 * Encoder for a number
 *
 * @tsplus implicit
 */
export const number: Encoder<number> = Encoder((u) => u)

/**
 * Encoder for null
 *
 * @tsplus implicit
 */
export const _null: Encoder<null> = Encoder((u) => u)

/**
 * Encoder for a string
 *
 * @tsplus implicit
 */
export const string: Encoder<string> = Encoder((u) => u)

/**
 * Encoder for a Date
 *
 * @tsplus implicit
 */
export const date: Encoder<Date> = Encoder((u) => u.toISOString())

/**
 * Encoder for an object shaped like { _tag: string }
 *
 * @tsplus implicit
 */
export const taggedObject: Encoder<{ _tag: string }> = Derive()

//
// Derivation Rules
//

/**
 * @tsplus derive Encoder<_> 10
 */
export function deriveNamed<A extends Brand<any>>(
  ...[base]: Check<Check.IsUnion<A>> extends Check.False ? [base: Encoder<Brand.Unnamed<A>>] : never
): Encoder<A> {
  // @ts-expect-error
  return base
}

/**
 * @tsplus derive Encoder<_> 10
 */
export function deriveValidation<A extends Brand.Valid<any, any>>(
  ...[base]: Check<Brand.IsValidated<A>> extends Check.True ? [base: Encoder<Brand.Unbranded<A>>]
    : never
): Encoder<A> {
  return Encoder((a) => base.encode(a as Brand.Unbranded<A>))
}

/**
 * @tsplus derive Encoder lazy
 */
export function deriveLazy<A>(fn: (_: Encoder<A>) => Encoder<A>): Encoder<A> {
  let cached: Encoder<A> | undefined
  const encoder: Encoder<A> = Encoder((a) => {
    if (!cached) {
      cached = fn(encoder)
    }
    return cached.encode(a)
  })
  return encoder
}

type EitherStructural<E, A> = { _tag: "Left"; left: E } | { _tag: "Right"; right: A }

function deriveEitherInternal<E, A>(
  left: Encoder<E>,
  right: Encoder<A>
): Encoder<EitherStructural<E, A>> {
  return Derive()
}

/**
 * @tsplus derive Encoder[Either]<_> 10
 */
export function deriveEither<A extends Either<any, any>>(
  ...[left, right]: [A] extends [Either<infer _E, infer _A>]
    ? [left: Encoder<_E>, right: Encoder<_A>]
    : never
): Encoder<A> {
  const structural = deriveEitherInternal(left, right)
  return Encoder((u) => structural.encode(u))
}

type OptionStructural<A> = { _tag: "None" } | { _tag: "Some"; value: A }

function deriveOptionInternal<A>(value: Encoder<A>): Encoder<OptionStructural<A>> {
  return Derive()
}

/**
 * @tsplus derive Encoder[Maybe]<_> 10
 */
export function deriveOption<A extends Maybe<any>>(
  ...[value]: [A] extends [Maybe<infer _A>] ? [value: Encoder<_A>]
    : never
): Encoder<A> {
  const structural = deriveOptionInternal(value)
  return Encoder((u) => structural.encode(u))
}

/**
 * @tsplus derive Encoder[Array]<_> 10
 */
export function deriveArray<A extends Array<any>>(
  ...[element]: [A] extends [Array<infer _A>]
    ? Check<Check.IsEqual<A, Array<_A>>> extends Check.True ? [element: Encoder<_A>]
    : never
    : never
): Encoder<A> {
  return Encoder((u) => u.map((a) => element.encode(a)))
}

/**
 * @tsplus derive Encoder[Chunk]<_> 10
 */
export function deriveChunk<A extends Chunk<any>>(
  ...[element]: [A] extends [Chunk<infer _A>]
    ? Check<Check.IsEqual<A, Chunk<_A>>> extends Check.True ? [element: Encoder<_A>]
    : never
    : never
): Encoder<A> {
  return Encoder((u) => Array.from(u).map((a) => element.encode(a)))
}

/**
 * @tsplus derive Encoder[List]<_> 10
 */
export function deriveList<A extends List<any>>(
  ...[element]: [A] extends [List<infer _A>]
    ? Check<Check.IsEqual<A, List<_A>>> extends Check.True ? [element: Encoder<_A>]
    : never
    : never
): Encoder<A> {
  return Encoder((u) => Array.from(u).map((a) => element.encode(a)))
}

/**
 * @tsplus derive Encoder[ImmutableArray]<_> 10
 */
export function deriveImmutableArray<A extends ImmutableArray<any>>(
  ...[element]: [A] extends [ImmutableArray<infer _A>]
    ? Check<Check.IsEqual<A, ImmutableArray<_A>>> extends Check.True ? [element: Encoder<_A>]
    : never
    : never
): Encoder<A> {
  return Encoder((u) => u.array.map((a) => element.encode(a)))
}

/**
 * @tsplus derive Encoder[SortedSet]<_> 10
 */
export function deriveSortedSet<A extends SortedSet<any>>(
  ...[element]: [A] extends [SortedSet<infer _A>]
    ? Check<Check.IsEqual<A, SortedSet<_A>>> extends Check.True ? [element: Encoder<_A>]
    : never
    : never
): Encoder<A> {
  return Encoder((u) => Array.from(u).map((a) => element.encode(a)))
}

/**
 * @tsplus derive Encoder<_> 10
 */
export function deriveEmptyRecord<A extends {}>(
  ..._: Check<Check.IsEqual<A, {}>> extends Check.True ? [] : never
): Encoder<A> {
  return Encoder((a) => a)
}

/**
 * @tsplus derive Encoder<_> 15
 */
export function deriveDictionary<A extends Record<string, any>>(
  ...[value]: Check<Check.IsDictionary<A>> extends Check.True ? [value: Encoder<A[keyof A]>] : never
): Encoder<A> {
  return Encoder((u) => {
    const encoded = {}
    for (const k of Object.keys(u)) {
      encoded[k] = value.encode(u[k])
    }
    return encoded
  })
}

/**
 * @tsplus derive Encoder<_> 15
 */
export function deriveRecord<A extends Record<string, any>>(
  ...[value, requiredKeys]: Check<Check.IsRecord<A>> extends Check.True ? [
    value: Encoder<A[keyof A]>,
    requiredKeys: { [k in keyof A]: 0 }
  ]
    : never
): Encoder<A> {
  return Encoder((u) => {
    const encoded = {}
    for (const k of Object.keys(requiredKeys)) {
      encoded[k] = value.encode(u[k])
    }
    return encoded
  })
}

/**
 * @tsplus derive Encoder<_> 20
 */
export function deriveLiteral<A extends string | number>(
  ...[value]: Check<Check.IsLiteral<A> & Check.Not<Check.IsUnion<A>>> extends Check.True
    ? [value: A]
    : never
): Encoder<A> {
  return Encoder(() => value)
}

/**
 * @tsplus derive Encoder<_> 20
 */
export function deriveStruct<A extends Record<string, any>>(
  ...[requiredFields, optionalFields]: Check<Check.IsStruct<A>> extends Check.True ? [
    ...[
      requiredFields: {
        [k in TypeLevel.RequiredKeys<A>]: Encoder<A[k]>
      }
    ],
    ...([TypeLevel.OptionalKeys<A>] extends [never] ? [] : [
      optionalFields: {
        [k in TypeLevel.OptionalKeys<A>]: Encoder<NonNullable<A[k]>>
      }
    ])
  ]
    : never
): Encoder<A> {
  return Encoder((u) => {
    const encoded = {}
    for (const field of Object.keys(requiredFields)) {
      encoded[field] = (requiredFields[field] as Encoder<unknown>).encode(u[field])
    }
    if (optionalFields) {
      for (const field of Object.keys(optionalFields)) {
        if (field in u && typeof u[field] !== "undefined") {
          encoded[field] = (optionalFields[field] as Encoder<unknown>).encode(u[field])
        }
      }
    }
    return encoded
  })
}

/**
 * @tsplus derive Encoder<_> 20
 */
export function deriveTagged<A extends { _tag: string }>(
  ...[elements]: Check<Check.IsTagged<"_tag", A>> extends Check.True ? [
    elements: {
      [k in A["_tag"]]: Encoder<Extract<A, { _tag: k }>>
    }
  ]
    : never
): Encoder<A> {
  return Encoder((u) => elements[u._tag].encode(u))
}

/**
 * @tsplus derive Encoder<|> 30
 */
export function deriveUnion<A extends unknown[]>(
  ...elements: {
    [k in keyof A]: [Guard<A[k]>, Encoder<A[k]>]
  }
): Encoder<A[number]> {
  return Encoder((u) => {
    for (const element of elements) {
      if (element[0].is(u)) {
        return element[1].encode(u)
      }
    }
  })
}

/**
 * @tsplus fluent Encoder encodeJSON
 */
export function encodeJSON<A>(encoder: Encoder<A>, a: A) {
  return JSON.stringify(encoder.encode(a))
}
