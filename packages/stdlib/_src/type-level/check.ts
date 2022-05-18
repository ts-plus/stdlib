type EqualsWrapped<T> = T extends infer R & {} ? {
  [P in keyof R]: R[P];
}
  : never;

declare const False: unique symbol;

declare const True: unique symbol;

/**
 * @tsplus type Check
 */
export type Check<Condition> = [Condition] extends [never] ? Check.False : Check.True;

export declare namespace Check {
  /**
   * @tsplus type Check.True
   */
  type True = typeof True;

  /**
   * @tsplus type Check.False
   */
  type False = typeof False;

  /**
   * @tsplus type Check.Not
   */
  type Not<A> = [A] extends [never] ? unknown : never;

  /**
   * @tsplus type Check.Extends
   */
  type Extends<A, B> = [A] extends [B] ? unknown : never;

  /**
   * @tsplus type Check.IsUnion
   */
  type IsUnion<T> = [T] extends [TypeLevel.UnionToIntersection<T>] ? never : unknown;

  /**
   * @tsplus type Check.IsEqual
   */
  type IsEqual<A, B> = (<T>() => T extends EqualsWrapped<A> ? 1 : 2) extends <
    T
  >() => T extends EqualsWrapped<B> ? 1 : 2 ? unknown
    : never;

  /**
   * @tsplus type Check.IsLiteral
   */
  type IsLiteral<A extends boolean | string | number> = Not<
    Extends<boolean, A> | Extends<string, A> | Extends<number, A>
  >;

  /**
   * @tsplus type Check.IsStruct
   */
  type IsStruct<A> = Check.Extends<keyof A, string> & Check.Not<Check.IsUnion<A>>;

  /**
   * @tsplus type Check.HaveSameLength
   */
  type HaveSameLength<A extends { length: number; }, B extends { length: number; }> = IsEqual<A["length"], B["length"]>;

  /**
   * @tsplus type Check.IsTagged
   */
  type IsTagged<Tag extends PropertyKey, A extends { [k in Tag]: string; }> =
    & IsUnion<A[Tag]>
    & IsUnion<A>
    & HaveSameLength<TypeLevel.UnionToTuple<A[Tag]>, TypeLevel.UnionToTuple<A>>;
}
