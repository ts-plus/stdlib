import { Cons, Nil } from "@tsplus/stdlib/collections/List/definition"

/**
 * A Guard<A> is a type representing the ability to identify when a value is of type A at runtime
 *
 * @tsplus type Guard
 * @tsplus derive nominal
 */
export interface Guard<in out A> {
  readonly is: (u: unknown) => u is A
}

/**
 * @tsplus type GuardOps
 */
export interface GuardOps {
  <A>(f: (u: unknown) => u is A): Guard<A>
}

/**
 * Creates a new Guard
 */
export const Guard: GuardOps = (is) => ({ is })

//
// Implicits
//

/**
 * Guard for `true`
 *
 * @tsplus implicit
 */
export const _true: Guard<true> = Guard((u): u is true => u === true)

/**
 * Guard for `false`
 *
 * @tsplus implicit
 */
export const _false: Guard<false> = Guard((u): u is false => u === false)

/**
 * Guard for a boolean
 *
 * @tsplus implicit
 */
export const boolean: Guard<boolean> = Guard((u): u is boolean => typeof u === "boolean")

/**
 * Guard for a number
 *
 * @tsplus implicit
 */
export const number: Guard<number> = Guard((u): u is number => typeof u === "number")

/**
 * Guard for null
 *
 * @tsplus implicit
 */
export const _null: Guard<null> = Guard((u): u is null => u === null)

/**
 * Guard for a string
 *
 * @tsplus implicit
 */
export const string: Guard<string> = Guard((u): u is string => typeof u === "string")

/**
 * Guard for a Date
 *
 * @tsplus implicit
 */
export const date: Guard<Date> = Guard((u): u is Date => u instanceof Date)

/**
 * Guard for an object shaped like { _tag: string }
 *
 * @tsplus implicit
 */
export const taggedObject: Guard<{
  _tag: string
}> = Derive()

//
// Derivation Rules
//

/**
 * @tsplus derive Guard lazy
 */
export function deriveLazy<A>(
  fn: (_: Guard<A>) => Guard<A>
): Guard<A> {
  let cached: Guard<A> | undefined
  const guard: Guard<A> = Guard((u): u is A => {
    if (!cached) {
      cached = fn(guard)
    }
    return cached.is(u)
  })
  return guard
}

/**
 * @tsplus derive Guard<_> 10
 */
export function deriveNamed<A extends Brand<any>>(
  ...[base]: Check<Check.IsUnion<A>> extends Check.False ? [
    base: Guard<Brand.Unnamed<A>>
  ]
    : never
): Guard<A> {
  // @ts-expect-error
  return base
}

/**
 * @tsplus derive Guard<_> 10
 */
export function deriveValidation<A extends Brand.Valid<any, any>>(
  ...[base, brands]: Check<Brand.IsValidated<A>> extends Check.True ? [
    base: Guard<Brand.Unbranded<A>>,
    brands: {
      [k in (keyof A[Brand.valid]) & string]: Brand.Validation<A[Brand.valid][k], k>
    }
  ]
    : never
): Guard<A> {
  const validateBrands = Object.keys(brands).map((k) => brands[k]!)
  return Guard((u): u is A =>
    base.is(u) && validateBrands.every((brand) => brand.validate(u as any))
  )
}

/**
 * @tsplus derive Guard<_> 20
 */
export function deriveLiteral<A extends string | number>(
  ...[value]: Check<Check.IsLiteral<A> & Check.Not<Check.IsUnion<A>>> extends Check.True
    ? [value: A]
    : never
): Guard<A> {
  return Guard((u): u is A => u === value)
}

/**
 * @tsplus derive Guard[Maybe]<_> 10
 */
export function deriveOption<A extends Maybe<any>>(
  ...[element]: [A] extends [Maybe<infer _A>] ? [element: Guard<_A>]
    : never
): Guard<A> {
  return Guard((u): u is A => {
    if (typeof u !== "object" || u == null) {
      return false
    }

    if (Equals.equals(Maybe.none, u)) {
      return true
    }

    const keys = Object.keys(u)

    if (keys.length !== 2) {
      return false
    }

    if ("_tag" in u && "value" in u && u["_tag"] === "Some") {
      return element.is(u["value"])
    }

    return false
  })
}

/**
 * @tsplus derive Guard[Chunk]<_> 10
 */
export function deriveChunk<A extends Chunk<any>>(
  ...[element]: [A] extends [Chunk<infer _A>] ? [element: Guard<_A>]
    : never
): Guard<A> {
  return Guard((u): u is A => {
    if (Chunk.isChunk(u)) {
      return u.forAll(element.is)
    }
    return false
  })
}

/**
 * @tsplus derive Guard[List]<_> 10
 */
export function deriveList<A extends List<any>>(
  ...[element]: [A] extends [List<infer _A>] ? [element: Guard<_A>]
    : never
): Guard<A> {
  return Guard((u): u is A => {
    if (u instanceof Cons || u instanceof Nil) {
      return (u as List<unknown>).forAll(element.is)
    }

    return false
  })
}

/**
 * @tsplus derive Guard[SortedSet]<_> 10
 */
export function deriveSortedSet<A extends SortedSet<any>>(
  ...[element]: [A] extends [SortedSet<infer _A>] ? [element: Guard<_A>]
    : never
): Guard<A> {
  return Guard((u): u is A => {
    if (SortedSet.isSortedSet(u)) {
      return u.forAll(element.is)
    }
    return false
  })
}

/**
 * @tsplus derive Guard[NonEmptyImmutableArray]<_> 10
 */
export function deriveNonEmptyImmutableArray<A extends ImmutableArray<any>>(
  ...[element]: [A] extends [NonEmptyImmutableArray<infer _A>] ? [element: Guard<_A>]
    : never
): Guard<A> {
  return Guard((u): u is A => {
    if (u instanceof ImmutableArray && u.isNonEmpty()) {
      return u.array.every(element.is)
    }

    return false
  })
}

/**
 * @tsplus derive Guard[ImmutableArray]<_> 10
 */
export function deriveImmutableArray<A extends ImmutableArray<any>>(
  ...[element]: [A] extends [ImmutableArray<infer _A>] ? [element: Guard<_A>]
    : never
): Guard<A> {
  return Guard((u): u is A => {
    if (u instanceof ImmutableArray) {
      return u.array.every(element.is)
    }

    return false
  })
}

/**
 * @tsplus derive Guard[Array]<_> 10
 */
export function deriveArray<A extends Array<any>>(
  ...[element]: [A] extends [Array<infer _A>]
    ? Check<Check.IsEqual<A, Array<_A>>> extends Check.True ? [element: Guard<_A>]
    : never
    : never
): Guard<A> {
  return Guard((u): u is A => {
    if (Array.isArray(u)) {
      return u.every(element.is)
    }

    return false
  })
}

/**
 * @tsplus derive Guard[Either]<_> 10
 */
export function deriveEither<A extends Either<any, any>>(
  ...[left, right]: [A] extends [Either<infer _E, infer _A>] ? [left: Guard<_E>, right: Guard<_A>]
    : never
): Guard<A> {
  return Guard((u): u is A => {
    if (typeof u !== "object" || u == null) {
      return false
    }

    const keys = Object.keys(u)

    if (keys.length !== 2) {
      return false
    }

    if ("_tag" in u) {
      switch (u["_tag"]) {
        case "Left": {
          return "left" in u && left.is(u["left"])
        }
        case "Right": {
          return "right" in u && right.is(u["right"])
        }
      }
    }

    return false
  })
}

/**
 * @tsplus derive Guard<_> 10
 */
export function deriveEmptyRecord<A extends {}>(
  ..._: Check<Check.IsEqual<A, {}>> extends Check.True ? [] : never
): Guard<A> {
  return Guard((u): u is A => typeof u === "object" && u !== null)
}

/**
 * @tsplus derive Guard<_> 20
 */
export function deriveStruct<A extends Record<string, any>>(
  ...[requiredFields, optionalFields]: Check<Check.IsStruct<A>> extends Check.True ? [
    ...[
      requiredFields: {
        [k in TypeLevel.RequiredKeys<A>]: Guard<A[k]>
      }
    ],
    ...([TypeLevel.OptionalKeys<A>] extends [never] ? [] : [
      optionalFields: {
        [k in TypeLevel.OptionalKeys<A>]: Guard<NonNullable<A[k]>>
      }
    ])
  ]
    : never
): Guard<A> {
  return Guard((u): u is A => {
    if (Derive<Guard<{}>>().is(u)) {
      for (const field of Object.keys(requiredFields)) {
        if (!(field in u) || !(requiredFields[field] as Guard<any>).is(u[field])) {
          return false
        }
      }
      if (optionalFields) {
        for (const field of Object.keys(optionalFields)) {
          if (
            field in u && typeof u[field] !== "undefined" &&
            !(optionalFields[field] as Guard<any>).is(u[field])
          ) {
            return false
          }
        }
      }
      return true
    }
    return false
  })
}

/**
 * @tsplus derive Guard<_> 15
 */
export function deriveDictionary<A extends Record<string, any>>(
  ...[valueGuard]: Check<Check.IsDictionary<A>> extends Check.True ? [value: Guard<A[keyof A]>]
    : never
): Guard<A> {
  return Guard((u): u is A => {
    if (Derive<Guard<{}>>().is(u)) {
      for (const k of Object.keys(u)) {
        if (!valueGuard.is(u[k])) {
          return false
        }
      }
      return true
    }
    return false
  })
}

/**
 * @tsplus derive Guard<_> 15
 */
export function deriveRecord<A extends Record<string, any>>(
  ...[value, requiredKeys]: Check<Check.IsRecord<A>> extends Check.True ? [
    value: Guard<A[keyof A]>,
    requiredKeys: { [k in keyof A]: 0 }
  ]
    : never
): Guard<A> {
  const keys = new Set(Object.keys(requiredKeys))
  return Guard((u): u is A => {
    const missing = new Set(Object.keys(requiredKeys))
    if (Derive<Guard<{}>>().is(u)) {
      for (const k of Object.keys(u)) {
        if (keys.has(k) && !value.is(u[k])) {
          return false
        }
        missing.delete(k)
      }
      return missing.size === 0
    }
    return false
  })
}

/**
 * @tsplus derive Guard<_> 20
 */
export function deriveTagged<A extends { _tag: string }>(
  ...[elements]: Check<Check.IsTagged<"_tag", A>> extends Check.True ? [
    elements: {
      [k in A["_tag"]]: Guard<Extract<A, { _tag: k }>>
    }
  ]
    : never
): Guard<A> {
  return Guard((u): u is A => {
    if (taggedObject.is(u)) {
      const guard = elements[u["_tag"] as A["_tag"]]
      if (guard) {
        return guard.is(u)
      }
    }
    return false
  })
}

/**
 * @tsplus derive Guard<|> 30
 */
export function deriveUnion<A extends unknown[]>(
  ...elements: {
    [k in keyof A]: Guard<A[k]>
  }
): Guard<A[number]> {
  return Guard((u): u is A[number] => {
    for (const element of elements) {
      if (element.is(u)) {
        return true
      }
    }
    return false
  })
}

/**
 * @tsplus fluent Guard asserts
 */
export function asserts<A>(self: Guard<A>, u: unknown): asserts u is A {
  if (!self.is(u)) {
    throw new Error("Invalid assertion")
  }
}
