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

/**
 * @tsplus type ListBuffer
 * @tsplus companion ListBuffer.Ops
 */
export class ListBuffer<A> implements Collection<A>, Equals {
  private first: List<A> = List.nil()
  private last0: List.Cons<A> | undefined = undefined
  private len = 0;

  [Symbol.iterator](): Iterator<A> {
    return this.first[Symbol.iterator]()
  }

  [Hash.sym]() {
    return Hash.randomCached(this)
  }

  [Equals.sym](that: unknown) {
    return this === that
  }

  static empty<A>(): ListBuffer<A> {
    return new ListBuffer()
  }

  static from<A>(as: Collection<A>): ListBuffer<A> {
    const buf = new ListBuffer<A>()
    for (const a of as) {
      buf.append(a)
    }
    return buf
  }

  get length(): number {
    return this.len
  }

  get isEmpty(): boolean {
    return this.len === 0
  }

  get unsafeHead(): A | undefined {
    if (this.isEmpty) {
      return undefined
    }
    return (this.first as List.Cons<A>).head
  }

  get unsafeTail(): List<A> | undefined {
    if (this.isEmpty) {
      return undefined
    }
    return (this.first as List.Cons<A>).tail
  }

  append(this: this, elem: A): this {
    const last1 = List.cons(elem, List.nil())
    if (this.len === 0) {
      this.first = last1
    } else {
      this.last0!.tail = last1
    }
    this.last0 = last1
    this.len += 1
    return this
  }

  prepend(this: this, elem: A): this {
    this.insert(0, elem)
    return this
  }

  unprepend(this: this): A {
    if (this.isEmpty) {
      throw new NoSuchElement()
    }
    const h = (this.first as List.Cons<A>).head
    this.first = (this.first as List.Cons<A>).tail
    this.len -= 1
    return h
  }

  get toList(): List<A> {
    return this.first
  }

  insert(this: this, idx: number, elem: A): this {
    if (idx < 0 || idx > this.len) {
      throw new IndexOutOfBounds(idx, 0, this.len - 1)
    }
    if (idx === this.len) {
      this.append(elem)
    } else {
      const p = this.locate(idx)
      const nx = List.cons(elem, this.getNext(p))
      if (p === undefined) {
        this.first = nx
      } else {
        ;(p as List.Cons<A>).tail = nx
      }
      this.len += 1
    }
    return this
  }

  reduce<B>(this: this, b: B, f: (b: B, a: A) => B): B {
    return this.first.reduce(b, f)
  }

  private getNext(p: List<A> | undefined): List<A> {
    if (p === undefined) {
      return this.first
    } else {
      return p.unsafeTail!
    }
  }

  private locate(i: number): List<A> | undefined {
    if (i === 0) {
      return undefined
    } else if (i === this.len) {
      return this.last0
    } else {
      let p = this.first
      for (let j = i - 1; j > 0; j--) {
        p = p.unsafeTail!
      }
      return p
    }
  }
}

/**
 * @tsplus getter ListBuffer toCollection
 */
export function toCollection<A>(self: ListBuffer<A>): Collection<A> {
  return self
}
