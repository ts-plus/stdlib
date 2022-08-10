/*
 * This file is ported from
 *
 * Scala (https://www.scala-lang.org)
 *
 * Copyright EPFL and Lightbend, Inc.
 *
 * Licensed under Apache License 2.0
 * (http://www.apache.org/licenses/LICENSE-2.0).
 */

export const ListTypeId = Symbol.for("@tsplus/collections/List")
export type ListTypeId = typeof ListTypeId

export const _A = Symbol.for("@tsplus/collections/List/_A")
export type _A = typeof _A

/**
 * @tsplus type List
 */
export type List<A> = Cons<A> | Nil<A>

type ConsNS<A> = Cons<A>
type NilNS<A> = Nil<A>
export declare namespace List {
  export type Cons<A> = ConsNS<A>
  export type Nil<A> = NilNS<A>
}

/**
 * @tsplus type List.Ops
 */
export interface ListOps {
  readonly $: ListAspects
}
export const List: ListOps = {
  $: {}
}

/**
 * @tsplus type List.Aspects
 */
export interface ListAspects {}

export declare namespace List {
  /**
   * @tsplus type NonEmptyList
   */
  export type NonEmpty<A> = Cons<A>
}

/**
 * @tsplus type List/Cons
 */
export class Cons<A> implements Collection<A>, Equals {
  readonly _tag = "Cons"
  readonly [_A]!: (_: never) => A
  readonly [ListTypeId] = ListTypeId
  constructor(readonly head: A, public tail: List<A>) {}
  [Symbol.iterator](): Iterator<A> {
    let done = false
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let these: List<A> = this
    return {
      next() {
        if (done) {
          return this.return!()
        }
        if (these._tag === "Nil") {
          done = true
          return this.return!()
        }
        const value: A = these.head
        these = these.tail
        return { done, value }
      },
      return(value?: unknown) {
        if (!done) {
          done = true
        }
        return { done: true, value }
      }
    }
  }
  [Hash.sym](): number {
    return Hash.iterator(this[Symbol.iterator]())
  }
  [Equals.sym](that: unknown): boolean {
    return that instanceof Cons && equalsWith(that, Equals.equals)(this)
  }
}

/**
 * @tsplus type List/Nil
 */
export class Nil<A> implements Collection<A>, Equals {
  readonly _tag = "Nil"
  readonly [_A]!: (_: never) => A
  readonly [ListTypeId] = ListTypeId;
  [Symbol.iterator](): Iterator<A> {
    return {
      next() {
        return { done: true, value: undefined }
      }
    }
  }
  [Hash.sym](): number {
    return Hash.iterator(this[Symbol.iterator]())
  }
  [Equals.sym](that: unknown): boolean {
    return that instanceof Nil
  }
}

export const _Nil = new Nil<never>()

/**
 * @tsplus unify List
 * @tsplus unify List/Nil
 * @tsplus unify List/Cons
 */
export function unify<X extends List<any>>(
  self: X
): List<[X] extends [{ readonly [_A]: (_: never) => infer A }] ? A : never> {
  return self
}

/**
 * @tsplus static List.Ops nil
 */
export function nil<A = never>(): Nil<A> {
  return _Nil
}

/**
 * @tsplus static List.Ops cons
 */
export function cons<A>(head: A, tail: List<A>): Cons<A> {
  return new Cons(head, tail)
}

/**
 * @tsplus fluent List isNil
 */
export function isNil<A>(self: List<A>): self is Nil<A> {
  return self._tag === "Nil"
}

/**
 * @tsplus fluent List isCons
 */
export function isCons<A>(self: List<A>): self is Cons<A> {
  return self._tag === "Cons"
}

/**
 * Returns the number of elements contained in a `List`
 *
 * @tsplus getter List length
 */
export function length<A>(self: List<A>): number {
  let these = self
  let len = 0
  while (!isNil(these)) {
    len += 1
    these = these.tail
  }
  return len
}

/**
 * @tsplus static List.Aspects equalsWith
 * @tsplus pipeable List equalsWith
 */
export function equalsWith<A, B>(
  that: List<B>,
  f: (a: A, b: B) => boolean
) {
  return (self: List<A>): boolean => {
    if ((self as List<A | B>) === that) {
      return true
    } else if (length(self) !== length(that)) {
      return false
    } else {
      const i0 = self[Symbol.iterator]()
      const i1 = that[Symbol.iterator]()
      let a: IteratorResult<A>
      let b: IteratorResult<B>
      while (!(a = i0.next()).done && !(b = i1.next()).done) {
        if (!f(a.value, b.value)) {
          return false
        }
      }
      return true
    }
  }
}

/**
 * @tsplus pipeable-operator List ==
 * @tsplus static List.Aspects equals
 * @tsplus pipeable List equals
 */
export function equals<A>(that: List<A>): (self: List<A>) => boolean
export function equals<B>(that: List<B>): <A>(self: List<A>) => boolean
export function equals<B>(that: List<B>) {
  return <A>(self: List<A>): boolean => self.equalsWith(that, Equals.equals)
}

/**
 * Type guard
 *
 * @tsplus static List.Ops isList
 */
export function isList<A>(u: Iterable<A>): u is List<A>
export function isList(u: unknown): u is List<unknown>
export function isList(u: unknown): u is List<unknown> {
  return typeof u === "object" && u != null && ListTypeId in u
}
