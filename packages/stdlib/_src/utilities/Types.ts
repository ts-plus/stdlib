export type MergeRecord<K, H> = {
  readonly [k in keyof K | keyof H]: k extends keyof K ? K[k]
    : k extends keyof H ? H[k]
    : never
} extends infer X ? X
  : never

export type ForcedArray<A> = A extends readonly any[] ? A : []

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void ? I
  : never

export type EnforceNonEmptyRecord<R> = keyof R extends never ? never : R

export type RefinementWithIndex<I, A, B extends A> = (i: I, a: A) => a is B

export type PredicateWithIndex<I, A> = (i: I, a: A) => boolean

export type Erase<R, K> = R & K extends K & infer R1 ? R1 : R

export interface Spreadable extends Record<PropertyKey, any> {}

export type ESArray<A> = Array<A>
export type ESReadonlyArray<A> = ReadonlyArray<A>
export const ESArray = Array

export type ESIterable<A> = globalThis.Iterable<A>

export type IsInt<N extends number> = N & (`${N}` extends `${bigint}` ? N : never)

declare global {
  /**
   * @tsplus type number
   */
  export interface Number {}
}

export type OrElse<A, B> = [A] extends [never] ? B : A
