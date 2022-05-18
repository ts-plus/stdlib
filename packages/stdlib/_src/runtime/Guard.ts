import { Cons, Nil } from "@tsplus/stdlib/collections/List/definition";
import { Left, Right } from "@tsplus/stdlib/data/Either/definition";
import { None, Some } from "@tsplus/stdlib/data/Option/definition";

/**
 * A Guard<A> is a type representing the ability to identify when a value is of type A at runtime
 *
 * @tsplus type Guard
 */
export interface Guard<A> {
  readonly is: (u: unknown) => u is A;
}

/**
 * @tsplus type GuardOps
 */
export interface GuardOps {
  <A>(f: (u: unknown) => u is A): Guard<A>;
}

/**
 * Creates a new Guard
 */
export const Guard: GuardOps = (is) => ({ is });

//
// Implicits
//

/**
 * Guard for `true`
 *
 * @tsplus implicit
 */
export const _true: Guard<true> = Guard((u): u is true => u === true);

/**
 * Guard for `false`
 *
 * @tsplus implicit
 */
export const _false: Guard<false> = Guard((u): u is false => u === false);

/**
 * Guard for a boolean
 *
 * @tsplus implicit
 */
export const boolean: Guard<boolean> = Guard((u): u is boolean => typeof u === "boolean");

/**
 * Guard for a number
 *
 * @tsplus implicit
 */
export const number: Guard<number> = Guard((u): u is number => typeof u === "number");

/**
 * Guard for a string
 *
 * @tsplus implicit
 */
export const string: Guard<string> = Guard((u): u is string => typeof u === "string");

/**
 * Guard for a Date
 *
 * @tsplus implicit
 */
export const date: Guard<Date> = Guard((u): u is Date => u instanceof Date);

/**
 * Guard for a {}
 *
 * @tsplus implicit
 */
export const record: Guard<{}> = Guard((u): u is {} => typeof u === "object" && u !== null);

/**
 * Guard for an object shaped like { _tag: string }
 *
 * @tsplus implicit
 */
export const taggedObject: Guard<{
  _tag: string;
}> = Derive();

//
// Derivation Rules
//

/**
 * @tsplus derive Guard lazy
 */
export function deriveLazy<A>(
  fn: (_: Guard<A>) => Guard<A>
): Guard<A> {
  let cached: Guard<A> | undefined;
  const guard: Guard<A> = Guard((u): u is A => {
    if (!cached) {
      cached = fn(guard);
    }
    return cached.is(u);
  });
  return guard;
}

/**
 * @tsplus derive Guard<_> 10
 */
export function deriveValidation<A extends Validation.Brand<any, any>>(
  ...[base, brands]: Check<Validation.IsValidated<A>> extends Check.True ? [
    base: Guard<Validation.Unbranded<A>>,
    brands: {
      [k in (keyof A[typeof Validation.sym]) & string]: Validation<A[typeof Validation.sym][k], k>;
    }
  ]
    : never
): Guard<A> {
  const validateBrands = Object.keys(brands).map((k) => brands[k]!);
  return Guard((u): u is A => base.is(u) && validateBrands.every((brand) => brand.validate(u as any)));
}

/**
 * @tsplus derive Guard<_> 20
 */
export function deriveLiteral<A extends string | number>(
  ...[value]: Check<Check.IsLiteral<A> & Check.Not<Check.IsUnion<A>>> extends Check.True ? [value: A] : never
): Guard<A> {
  return Guard((u): u is A => u === value);
}

/**
 * @tsplus derive Guard[Option]<_> 10
 */
export function deriveOption<A extends Option<any>>(
  ...[element]: [A] extends [Option<infer _A>] ? [element: Guard<_A>]
    : never
): Guard<A> {
  return Guard((u): u is A => {
    if (u instanceof None) {
      return true;
    }
    if (u instanceof Some) {
      return element.is(u.value);
    }
    return false;
  });
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
      return u.forAll(element.is);
    }
    return false;
  });
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
      return (u as List<unknown>).forAll(element.is);
    }

    return false;
  });
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
      return u.forAll(element.is);
    }
    return false;
  });
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
      return u.array.every(element.is);
    }

    return false;
  });
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
      return u.array.every(element.is);
    }

    return false;
  });
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
      return u.every(element.is);
    }

    return false;
  });
}

/**
 * @tsplus derive Guard[Either]<_> 10
 */
export function deriveEither<A extends Either<any, any>>(
  ...[left, right]: [A] extends [Either<infer _E, infer _A>] ? [left: Guard<_E>, right: Guard<_A>]
    : never
): Guard<A> {
  return Guard((u): u is A => {
    if (u instanceof Left) {
      return left.is(u.left);
    }
    if (u instanceof Right) {
      return right.is(u.right);
    }
    return false;
  });
}

/**
 * @tsplus derive Guard<_> 20
 */
export function deriveStruct<A extends Record<string, any>>(
  ...[requiredFields, optionalFields]: Check<Check.IsStruct<A>> extends Check.True ? [
    ...[
      requiredFields: {
        [k in TypeLevel.RequiredKeys<A>]: Guard<A[k]>;
      }
    ],
    ...([TypeLevel.OptionalKeys<A>] extends [never] ? [] : [
      optionalFields: {
        [k in TypeLevel.OptionalKeys<A>]: Guard<NonNullable<A[k]>>;
      }
    ])
  ]
    : never
): Guard<A> {
  return Guard((u): u is A => {
    if (record.is(u)) {
      for (const field of Object.keys(requiredFields)) {
        if (!(field in u) || !(requiredFields[field] as Guard<any>).is(u[field])) {
          return false;
        }
      }
      if (optionalFields) {
        for (const field of Object.keys(optionalFields)) {
          if (field in u && typeof field !== "undefined" && !(optionalFields[field] as Guard<any>).is(u[field])) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  });
}

/**
 * @tsplus derive Guard<_> 20
 */
export function deriveTagged<A extends { _tag: string; }>(
  ...[elements]: Check<Check.IsTagged<"_tag", A>> extends Check.True ? [
    elements: {
      [k in A["_tag"]]: Guard<Extract<A, { _tag: k; }>>;
    }
  ]
    : never
): Guard<A> {
  return Guard((u): u is A => {
    if (taggedObject.is(u)) {
      const guard = elements[u["_tag"] as A["_tag"]];
      if (guard) {
        return guard.is(u);
      }
    }
    return false;
  });
}

/**
 * @tsplus derive Guard<|> 30
 */
export function deriveUnion<A extends unknown[]>(
  ...elements: {
    [k in keyof A]: Guard<A[k]>;
  }
): Guard<A[number]> {
  return Guard((u): u is A[number] => {
    for (const element of elements) {
      if (element.is(u)) {
        return true;
      }
    }
    return false;
  });
}

/**
 * @tsplus fluent Guard asserts
 */
export function asserts<A>(self: Guard<A>, u: unknown): asserts u is A {
  if (!self.is(u)) {
    throw new Error("Invalid assertion");
  }
}
