import type { ESReadonlyArray } from "@tsplus/stdlib/utilities/Types"
import { ESArray } from "@tsplus/stdlib/utilities/Types"

declare global {
  /**
   * @tsplus type Array
   */
  export interface Array<T> {}
  /**
   * @tsplus type ImmutableArray
   */
  export interface ReadonlyArray<T> {}
}

/**
 * @tsplus type ImmutableArrayOps
 */
export interface ImmutableArrayConstructor {
  new (arrayLength?: number): ImmutableArray<any>
  new <T>(arrayLength: number): ImmutableArray<T>
  new <T>(...items: T[]): ImmutableArray<T>
  (arrayLength?: number): ImmutableArray<any>
  <T>(arrayLength: number): ImmutableArray<T>
  <T>(...items: T[]): ImmutableArray<T>
  <A extends any[]>(...as: A): ImmutableArray<A[number]>
  isArray(arg: any): arg is ImmutableArray<any>
  readonly prototype: ImmutableArray<any>
  from<T>(iterable: Iterable<T> | ArrayLike<T>): ImmutableArray<T>
  from<T, U>(
    iterable: Iterable<T> | ArrayLike<T>,
    mapfn: (v: T, k: number) => U,
    thisArg?: any
  ): ImmutableArray<T>
}

export type ImmutableArray<A> = ESReadonlyArray<A>
export const ImmutableArray: ImmutableArrayConstructor = ESArray

/**
 * @tsplus type ImmutableArrayOps
 */
export interface ReadonlyArrayOps {}

/**
 * @tsplus static ImmutableArrayOps make
 */
export function make<A extends readonly any[]>(...as: A): ImmutableArray<A[number]> {
  return as
}

/**
 * @tsplus fluent Array mapImmutable
 * @tsplus fluent ImmutableArray mapImmutable
 */
export function map_<A, B>(
  i: ImmutableArray<A>,
  f: (a: A, k: number) => B
): ImmutableArray<B> {
  return i.map(f)
}

export const map = Pipeable(map_)

/**
 * @tsplus fluent Array immutable
 */
export function immutable<A>(self: Array<A>): ImmutableArray<A> {
  return self.slice(0, self.length)
}
