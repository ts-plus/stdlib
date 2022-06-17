export const ParseErrorId = Symbol.for("@tsplus/stdlib/runtime/Decoder/DecoderError")
export type ParseErrorId = typeof ParseErrorId

export declare namespace Decoder {
  interface Error {
    render: () => Tree<string>
  }
}

/**
 * @tsplus type Decoder
 */
export interface Decoder<A> {
  readonly decodeResult: (u: unknown) => Result<Decoder.Error, Decoder.Error, A>
}

/**
 * @tsplus type Decoder/Ops
 */
export interface DecoderOps {}
export const Decoder: DecoderOps = {}

/**
 * @tsplus static Decoder/Ops __call
 */
export function make<A>(decodeResult: (u: unknown) => Result<Decoder.Error, Decoder.Error, A>): Decoder<A> {
  return {
    decodeResult
  }
}

//
// Utilities
//

/**
 * @tsplus fluent Decoder decodeJSON
 */
export function decodeJSON<A>(decoder: Decoder<A>, json: string) {
  try {
    return decoder.decode(JSON.parse(json))
  } catch {
    return Either.left(`Invalid json string: ${json}`)
  }
}

/**
 * @tsplus fluent Decoder decode
 */
export function decode<A>(decoder: Decoder<A>, value: unknown) {
  const result = decoder.decodeResult(value)
  if (result.isFailure()) {
    return Either.left(result.failure.render().draw)
  }
  return Either.right(result.success)
}

//
// Errors
//

export class DecoderErrorPrimitive implements Decoder.Error {
  constructor(
    readonly value: unknown,
    readonly expectedType: string
  ) {}
  render = () => {
    return Tree(`Expected a value of type "${this.expectedType}" but received one of type "${typeof this.value}"`)
  }
}

export class DecoderErrorIsoDateInvalidString implements Decoder.Error {
  constructor(
    readonly value: string
  ) {}
  render = () => {
    return Tree(`Expected a Date represented as an iso string instead received "${this.value}"`)
  }
}

export class DecoderErrorIsoDateMalformed implements Decoder.Error {
  constructor(
    readonly value: unknown
  ) {}
  render = () => {
    return Tree(`Expected a Date represented as an iso string instead received one of type "${typeof this.value}"`)
  }
}

export class DecoderErrorLiteral implements Decoder.Error {
  constructor(
    readonly expected: string | number,
    readonly value: unknown
  ) {}
  render = () => {
    return Tree(
      `Expected literal "${this.expected}"${
        typeof this.expected === "number" ?
          ` of type "${typeof this.expected}"` :
          ""
      } instead received ${
        typeof this.value === typeof this.expected ? `"${this.value}"` : `one of type "${typeof this.value}"`
      }`
    )
  }
}

export class DecoderErrorStructMissingField implements Decoder.Error {
  render = () => Tree(`Missing`)
}

export class DecoderErrorStructFieldError implements Decoder.Error {
  constructor(
    readonly field: string,
    readonly fieldError: Decoder.Error
  ) {}
  render = () => Tree(`Field "${this.field}"`, Chunk(this.fieldError.render()))
}

export class DecoderErrorStruct implements Decoder.Error {
  constructor(
    readonly fields: Chunk<DecoderErrorStructFieldError>
  ) {}
  render = () => Tree(`Encountered while parsing an object structure`, this.fields.map((d) => d.render()))
}

export class DecoderErrorTaggedMalformed implements Decoder.Error {
  constructor(readonly keys: string[]) {}
  render = () =>
    Tree(`Expected a tagged object of the form "{ _tag: ${this.keys.sort().map(k => `"${k}"`).join(" | ")} }"`)
}

export class DecoderErrorTaggedInner implements Decoder.Error {
  constructor(readonly tag: string, readonly error: Decoder.Error) {}
  render = () => Tree(`Encountered while processing tagged object "${this.tag}"`, Chunk(this.error.render()))
}

export class DecoderErrorUnionMember implements Decoder.Error {
  constructor(readonly error: Decoder.Error) {}
  render = () => Tree(`Encountered while processing a union member`, Chunk(this.error.render()))
}

export class DecoderErrorUnion implements Decoder.Error {
  constructor(readonly errors: Chunk<DecoderErrorUnionMember>) {}
  render = () =>
    Tree(
      `Encountered while processing union`,
      this.errors.map((m) => m.render())
    )
}

export class DecoderErrorArray implements Decoder.Error {
  constructor(readonly errors: Chunk<[number, Decoder.Error]>) {}

  render = () =>
    Tree(
      `Encountered while processing an Array of elements`,
      this.errors.map(([n, err]) => Tree(`Encountered while processing element "${n}"`, Chunk(err.render())))
    )
}

export class DecoderErrorValidation implements Decoder.Error {
  constructor(readonly errors: string[]) {}
  render = () =>
    Tree(
      `Encountered while processing validations: ${this.errors.sort().join(", ")}`
    )
}

//
// Implicits
//

/**
 * @tsplus implicit
 */
export const _true: Decoder<true> = Decoder((u) =>
  Derive<Guard<true>>().is(u) ? Result.success(u) : Result.fail(new DecoderErrorPrimitive(u, "true"))
)

/**
 * @tsplus implicit
 */
export const _false: Decoder<false> = Decoder((u) =>
  Derive<Guard<false>>().is(u) ? Result.success(u) : Result.fail(new DecoderErrorPrimitive(u, "false"))
)

/**
 * @tsplus implicit
 */
export const boolean: Decoder<boolean> = Decoder((u) =>
  Derive<Guard<boolean>>().is(u) ? Result.success(u) : Result.fail(new DecoderErrorPrimitive(u, "boolean"))
)

/**
 * @tsplus implicit
 */
export const string: Decoder<string> = Decoder((u) =>
  Derive<Guard<string>>().is(u) ? Result.success(u) : Result.fail(new DecoderErrorPrimitive(u, "string"))
)

/**
 * @tsplus implicit
 */
export const number: Decoder<number> = Decoder((u) =>
  Derive<Guard<number>>().is(u) ? Result.success(u) : Result.fail(new DecoderErrorPrimitive(u, "number"))
)

/**
 * @tsplus implicit
 */
export const record: Decoder<{}> = Decoder((u) =>
  Derive<Guard<{}>>().is(u) ? Result.success(u) : Result.fail(new DecoderErrorPrimitive(u, "{}"))
)

/**
 * @tsplus implicit
 */
export const date: Decoder<Date> = Decoder((u) => {
  const strRes = string.decodeResult(u)
  if (strRes.isFailure()) {
    return strRes
  }
  const str = strRes.success
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) {
    return Result.fail(new DecoderErrorIsoDateInvalidString(str))
  }
  const date = new Date(str)
  if (date.toISOString() !== str) {
    return Result.fail(new DecoderErrorIsoDateInvalidString(str))
  }
  return Result.success(date)
})

//
// Derivation Rules
//

/**
 * @tsplus derive Decoder lazy
 */
export function deriveLazy<A>(
  fn: (_: Decoder<A>) => Decoder<A>
): Decoder<A> {
  let cached: Decoder<A> | undefined
  const decoder: Decoder<A> = Decoder((u) => {
    if (!cached) {
      cached = fn(decoder)
    }
    return cached.decodeResult(u)
  })
  return decoder
}

/**
 * @tsplus derive Decoder<_> 10
 */
export function deriveValidation<A extends Validation.Brand<any, any>>(
  ...[base, brands]: Check<Validation.IsValidated<A>> extends Check.True ? [
    base: Decoder<Validation.Unbranded<A>>,
    brands: {
      [k in (keyof A[typeof Validation.sym]) & string]: Validation<A[typeof Validation.sym][k], k>
    }
  ]
    : never
): Decoder<A> {
  const brandKeys = Object.keys(brands)
  return Decoder((u) =>
    base.decodeResult(u).fold(
      (baseValue, warning) => {
        const errors: string[] = []
        for (const brand of brandKeys) {
          if (!brands[brand]!.validate(baseValue as any)) {
            errors.push(brand)
          }
        }
        if (errors.length > 0) {
          return Result.fail(new DecoderErrorValidation(errors))
        }
        return Result.success(baseValue, warning)
      },
      (e) => Result.fail(e)
    )
  )
}

/**
 * @tsplus derive Decoder[Chunk]<_> 10
 */
export function deriveChunk<A extends Chunk<any>>(
  ...[array]: [A] extends [Chunk<infer _A>]
    ? Check<Check.IsEqual<A, Chunk<_A>>> extends Check.True ? [array: Decoder<Array<_A>>]
    : never
    : never
): Decoder<A> {
  return Decoder((u) => array.decodeResult(u).map((a) => Chunk.from(a) as A))
}

/**
 * @tsplus derive Decoder[List]<_> 10
 */
export function deriveList<A extends List<any>>(
  ...[array]: [A] extends [List<infer _A>]
    ? Check<Check.IsEqual<A, List<_A>>> extends Check.True ? [array: Decoder<Array<_A>>]
    : never
    : never
): Decoder<A> {
  return Decoder((u) => array.decodeResult(u).map((a) => List.from(a) as A))
}

/**
 * @tsplus derive Decoder[ImmutableArray]<_> 10
 */
export function deriveImmutableArray<A extends ImmutableArray<any>>(
  ...[array]: [A] extends [ImmutableArray<infer _A>]
    ? Check<Check.IsEqual<A, ImmutableArray<_A>>> extends Check.True ? [array: Decoder<Array<_A>>]
    : never
    : never
): Decoder<A> {
  return Decoder((u) => array.decodeResult(u).map((a) => new ImmutableArray(a) as A))
}

/**
 * @tsplus derive Decoder[Array]<_> 10
 */
export function deriveArray<A extends Array<any>>(
  ...[element]: [A] extends [Array<infer _A>]
    ? Check<Check.IsEqual<A, Array<_A>>> extends Check.True ? [element: Decoder<_A>]
    : never
    : never
): Decoder<A> {
  return Decoder((u) => {
    if (Array.isArray(u)) {
      const errorsBuilder = Chunk.builder<[number, Decoder.Error]>()
      let hasFailed = false
      const out: unknown[] = []
      for (let i = 0; i < u.length; i++) {
        const decoded = element.decodeResult(u[i])
        if (decoded.isFailure()) {
          hasFailed = true
          errorsBuilder.append([i, decoded.failure])
        } else {
          const warning = decoded.getWarning()
          if (warning.isSome()) {
            errorsBuilder.append([i, warning.value])
          }
          out[i] = decoded.success
        }
      }
      const errors = errorsBuilder.build()
      if (hasFailed) {
        return Result.fail(new DecoderErrorArray(errors))
      }
      return Result.success(out as A, errors.isEmpty ? Maybe.none : Maybe.some(new DecoderErrorArray(errors)))
    }
    return Result.fail(new DecoderErrorPrimitive(u, "Array"))
  })
}

type EitherStructural<E, A> = { _tag: "Left"; left: E } | { _tag: "Right"; right: A }

function deriveEitherInternal<E, A>(
  /** @tsplus implicit local */ left: Decoder<E>,
  /** @tsplus implicit local */ right: Decoder<A>
): Decoder<EitherStructural<E, A>> {
  return Derive()
}

/**
 * @tsplus derive Decoder[Either]<_> 10
 */
export function deriveEither<A extends Either<any, any>>(
  ...[left, right]: [A] extends [Either<infer _E, infer _A>] ? [left: Decoder<_E>, right: Decoder<_A>]
    : never
): Decoder<A> {
  const structural = deriveEitherInternal(left, right)
  return Decoder((u) =>
    structural.decodeResult(u).map((e) => e._tag === "Left" ? Either.left(e.left) as A : Either.right(e.right) as A)
  )
}

type OptionStructural<A> = { _tag: "None" } | { _tag: "Some"; value: A }

function deriveOptionInternal<A>(
  /** @tsplus implicit local */ value: Decoder<A>
): Decoder<OptionStructural<A>> {
  return Derive()
}

/**
 * @tsplus derive Decoder[Maybe]<_> 10
 */
export function deriveOption<A extends Maybe<any>>(
  ...[value]: [A] extends [Maybe<infer _A>] ? [value: Decoder<_A>]
    : never
): Decoder<A> {
  const structural = deriveOptionInternal(value)
  return Decoder((u) =>
    structural.decodeResult(u).map((e) => e._tag === "Some" ? Maybe.some(e.value) as A : Maybe.none as A)
  )
}

export class DecoderErrorRecordValue implements Decoder.Error {
  constructor(
    readonly key: string,
    readonly error: Decoder.Error
  ) {}
  render = () => Tree(`Encountered while parsing a record value at "${this.key}"`, Chunk(this.error.render()))
}

export class DecoderErrorRecordFields implements Decoder.Error {
  constructor(
    readonly fields: Chunk<Decoder.Error>
  ) {}
  render = () => Tree(`Encountered while parsing a record structure`, this.fields.map((d) => d.render()))
}

export class DecoderErrorRecordMissingKeys implements Decoder.Error {
  constructor(
    readonly missing: Chunk<string>
  ) {}
  render = () =>
    Tree(
      `Encountered while parsing a record structure, missing keys: ${this.missing.map((k) => `"${k}"`).join(", ")}`
    )
}

/**
 * @tsplus derive Decoder<_> 15
 */
export function deriveRecord<A extends Record<string, any>>(
  ...[keyGuard, valueDecoder, requiredKeysRecord]: [A] extends [Record<infer X, infer Y>] ? Check<
    Check.Not<Check.IsUnion<A>> & Check.IsEqual<A, Record<X, Y>>
  > extends Check.True ? [keyGuard: Guard<X>, valueDecoder: Decoder<Y>, requiredKeysRecord: { [k in X]: 0 }]
  : never
    : never
): Decoder<A> {
  return Decoder((u) => {
    const asRecordResult = record.decodeResult(u)
    if (asRecordResult.isFailure()) {
      return Result.fail(asRecordResult.failure)
    }
    const asRecord = asRecordResult.success
    const fieldErrors = Chunk.builder<Decoder.Error>()
    let isFailure = false
    const missing = new Set(Object.keys(requiredKeysRecord))
    const res = {}
    for (const k of Object.keys(asRecord)) {
      if (keyGuard.is(k)) {
        const valueResult = valueDecoder.decodeResult(asRecord[k])
        if (valueResult.isFailure()) {
          isFailure = true
        }
        const valueError = valueResult.getWarningOrFailure()
        if (valueError.isSome()) {
          fieldErrors.append(new DecoderErrorRecordValue(k, valueError.value.merge))
        }
        const valueSuccess = valueResult.getSuccess()
        if (valueSuccess.isNone()) {
          continue
        }
        missing.delete(k)
        res[k] = valueSuccess.value
      }
    }
    const errors = fieldErrors.build()
    if (isFailure) {
      return Result.fail(new DecoderErrorRecordFields(errors))
    }
    if (errors.size > 0) {
      return Result.successWithWarning(res as A, new DecoderErrorRecordFields(errors))
    }
    if (missing.size > 0) {
      return Result.fail(new DecoderErrorRecordMissingKeys(Chunk.from(missing).sort(Ord.string)))
    }
    return Result.success(res as A)
  })
}

/**
 * @tsplus derive Decoder<_> 20
 */
export function deriveLiteral<A extends string | number>(
  ...[value]: Check<Check.IsLiteral<A> & Check.Not<Check.IsUnion<A>>> extends Check.True ? [value: A] : never
): Decoder<A> {
  return Decoder((u) => u === value ? Result.success(u as A) : Result.fail(new DecoderErrorLiteral(value, u)))
}

/**
 * @tsplus derive Decoder<_> 20
 */
export function deriveStruct<A extends Record<string, any>>(
  ...[requiredFields, optionalFields]: Check<Check.IsStruct<A>> extends Check.True ? [
    ...[
      requiredFields: {
        [k in TypeLevel.RequiredKeys<A>]: Decoder<A[k]>
      }
    ],
    ...([TypeLevel.OptionalKeys<A>] extends [never] ? [] : [
      optionalFields: {
        [k in TypeLevel.OptionalKeys<A>]: Decoder<NonNullable<A[k]>>
      }
    ])
  ]
    : never
): Decoder<A> {
  return Decoder((u) => {
    const decodeRecordResult = record.decodeResult(u)
    if (decodeRecordResult.isFailure()) {
      return decodeRecordResult
    }
    const input = decodeRecordResult.success
    let errored = false
    const errors: DecoderErrorStructFieldError[] = []
    const decoded = {} as A
    for (const field of Object.keys(requiredFields)) {
      if (!(field in input)) {
        errors.push(new DecoderErrorStructFieldError(field, new DecoderErrorStructMissingField()))
        errored = true
      } else {
        const res = (requiredFields[field] as Decoder<any>).decodeResult(input[field])
        res.fold(
          (a, w) => {
            decoded[field as keyof A] = a
            if (w.isSome()) {
              errors.push(new DecoderErrorStructFieldError(field, w.value))
            }
          },
          (e) => {
            errored = true
            errors.push(new DecoderErrorStructFieldError(field, e))
          }
        )
      }
    }
    if (optionalFields) {
      for (const field of Object.keys(optionalFields)) {
        if ((field in input) && typeof input[field] !== "undefined") {
          const res = (optionalFields[field] as Decoder<any>).decodeResult(input[field])
          res.fold(
            (a, w) => {
              decoded[field as keyof A] = a
              if (w.isSome()) {
                errors.push(new DecoderErrorStructFieldError(field, w.value))
              }
            },
            (e) => {
              errored = true
              errors.push(new DecoderErrorStructFieldError(field, e))
            }
          )
        }
      }
    }
    if (errored) {
      return Result.fail(new DecoderErrorStruct(Chunk.from(errors)))
    }
    if (errors.length !== 0) {
      return Result.successWithWarning(decoded, new DecoderErrorStruct(Chunk.from(errors)))
    }
    return Result.success(decoded)
  })
}

/**
 * @tsplus derive Decoder<_> 20
 */
export function deriveTagged<A extends { _tag: string }>(
  ...[elements]: Check<Check.IsTagged<"_tag", A>> extends Check.True ? [
    elements: {
      [k in A["_tag"]]: Decoder<Extract<A, { _tag: k }>>
    }
  ]
    : never
): Decoder<A> {
  /** @tsplus implicit local */
  const tags = Guard((u): u is A["_tag"] => typeof u === "string" && u in elements)
  const structure = Guard<{ _tag: A["_tag"] }>((u): u is { _tag: A["_tag"] } =>
    typeof u === "object" && u != null && "_tag" in u && tags.is(u["_tag"])
  )
  return Decoder((u) => {
    if (structure.is(u)) {
      return elements[u["_tag"]].decodeResult(u).fold(
        (a, w) => Result.success(a, w.map((e) => new DecoderErrorTaggedInner(u["_tag"], e))),
        (e) => Result.fail(new DecoderErrorTaggedInner(u["_tag"], e))
      )
    }
    return Result.fail(new DecoderErrorTaggedMalformed(Object.keys(elements)))
  })
}

/**
 * @tsplus derive Decoder<|> 30
 */
export function deriveUnion<A extends unknown[]>(
  ...elements: {
    [k in keyof A]: Decoder<A[k]>
  }
): Decoder<A[number]> {
  return Decoder((u) => {
    const errors: DecoderErrorUnionMember[] = []
    for (const element of elements) {
      const res = element.decodeResult(u)
      if (res.isFailure()) {
        errors.push(new DecoderErrorUnionMember(res.failure))
      } else {
        return Result.success(
          res.success,
          res.getWarning().map((e) => new DecoderErrorUnion(Chunk(new DecoderErrorUnionMember(e))))
        )
      }
    }
    return Result.fail(new DecoderErrorUnion(Chunk.from(errors)))
  })
}
