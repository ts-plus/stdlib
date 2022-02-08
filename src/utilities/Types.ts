import type { Tuple } from "../data/Tuple/definition.js"

export type MergeRecord<K, H> = {
  readonly [k in keyof K | keyof H]: k extends keyof K
    ? K[k]
    : k extends keyof H
    ? H[k]
    : never
} extends infer X
  ? X
  : never

export type ForcedTuple<A> = A extends unknown[] ? Tuple<A> : never

export type ForcedArray<A> = A extends readonly any[] ? A : []

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never

export type EnforceNonEmptyRecord<R> = keyof R extends never ? never : R

export type RefinementWithIndex<I, A, B extends A> = (i: I, a: A) => a is B

export type PredicateWithIndex<I, A> = (i: I, a: A) => boolean

export type Erase<R, K> = R & K extends K & infer R1 ? R1 : R

export interface Spreadable extends Record<PropertyKey, any> {}
