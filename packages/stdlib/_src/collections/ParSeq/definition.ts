export const ParSeqSym = Symbol.for("@tsplus/stdlib/collections/ParSeq")
export type ParSeqSym = typeof ParSeqSym

export const _A = Symbol.for("@tsplus/stdlib/collections/ParSeq/A")
export type _A = typeof _A

/**
 * `ParSeq` is a data type that represents some notion of "events" that can
 * take place in parallel or in sequence. For example, a `ParSeq`
 * parameterized on some error type could be used to model the potentially
 * multiple ways that an application can fail. On the other hand, a `ParSeq`
 * parameterized on some request type could be used to model a collection of
 * requests to external data sources, some of which could be executed in
 * parallel and some of which must be executed sequentially.
 *
 * @tsplus type ParSeq
 */
export type ParSeq<A> = Empty | Single<A> | Then<A> | Both<A>

/**
 * @tsplus type ParSeq.Ops
 */
export interface ParSeqOps {
  $: ParSeqAspects
}
export const ParSeq: ParSeqOps = {
  $: {}
}

/**
 * @tsplus type ParSeq.Aspects
 */
export interface ParSeqAspects {}

const _emptyHash = Hash.optimize(Hash.random())

/**
 * @tsplus type ParSeq/Empty
 */
export class Empty implements Equals {
  readonly _tag = "Empty"

  readonly [ParSeqSym]: ParSeqSym = ParSeqSym
  readonly [_A]!: () => never;

  [Equals.sym](that: unknown): boolean {
    return isParSeq(that) && this.equalsSafe(that).run
  }

  [Hash.sym](): number {
    return _emptyHash
  }

  equalsSafe(that: ParSeq<unknown>): Eval<boolean> {
    return Eval.succeed(that._tag === "Empty")
  }
}

/**
 * @tsplus type ParSeq/Single
 */
export class Single<A> implements Equals {
  readonly _tag = "Single"

  readonly [ParSeqSym]: ParSeqSym = ParSeqSym
  readonly [_A]!: () => A

  constructor(readonly a: A) {}

  [Equals.sym](that: unknown): boolean {
    return isParSeq(that) && this.equalsSafe(that).run
  }

  [Hash.sym](): number {
    return Hash.combine(Hash.string(this._tag), Hash.unknown(this.a))
  }

  equalsSafe(that: ParSeq<unknown>): Eval<boolean> {
    return Eval.succeed(that._tag === "Single" && Equals.equals(this.a, that.a))
  }
}

/**
 * @tsplus type ParSeq/Then
 */
export class Then<A> implements Equals {
  readonly _tag = "Then"

  readonly [ParSeqSym]: ParSeqSym = ParSeqSym
  readonly [_A]!: () => A

  constructor(readonly left: ParSeq<A>, readonly right: ParSeq<A>) {}

  [Equals.sym](that: unknown): boolean {
    return isParSeq(that) && this.equalsSafe(that).run
  }

  [Hash.sym](): number {
    return hashCode(this)
  }

  equalsSafe(that: ParSeq<unknown>): Eval<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    return Eval.gen(function*($) {
      return (
        (yield* $(self.eq(that))) ||
        (yield* $(symmetric(associateThen)(self, that))) ||
        (yield* $(symmetric(distributiveThen)(self, that))) ||
        (yield* $(symmetric(zero)(self, that)))
      )
    })
  }

  private eq(that: ParSeq<unknown>): Eval<boolean> {
    if (that._tag === "Then") {
      return this.left.equalsSafe(that.left).zipWith(
        this.right.equalsSafe(that.right),
        (a, b) => a && b
      )
    }
    return Eval.succeed(false)
  }
}

/**
 * @tsplus type ParSeq/Both
 */
export class Both<A> implements Equals {
  readonly _tag = "Both"

  readonly [ParSeqSym]: ParSeqSym = ParSeqSym
  readonly [_A]!: () => A

  constructor(readonly left: ParSeq<A>, readonly right: ParSeq<A>) {}

  [Equals.sym](that: unknown): boolean {
    return isParSeq(that) && this.equalsSafe(that).run
  }

  [Hash.sym](): number {
    return hashCode(this)
  }

  equalsSafe(that: ParSeq<unknown>): Eval<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    return Eval.gen(function*(_) {
      return (
        (yield* _(self.eq(that))) ||
        (yield* _(symmetric(associativeBoth)(self, that))) ||
        (yield* _(symmetric(distributiveBoth)(self, that))) ||
        (yield* _(commutativeBoth(self, that))) ||
        (yield* _(symmetric(zero)(self, that)))
      )
    })
  }

  private eq(that: ParSeq<unknown>): Eval<boolean> {
    if (that._tag === "Both") {
      return this.left.equalsSafe(that.left).zipWith(
        this.right.equalsSafe(that.right),
        (a, b) => a && b
      )
    }
    return Eval.succeed(false)
  }
}

function associateThen<A>(self: ParSeq<A>, that: ParSeq<A>): Eval<boolean> {
  if (
    self._tag === "Then" &&
    self.left._tag === "Then" &&
    that._tag === "Then" &&
    that.right._tag === "Then"
  ) {
    const al = self.left.left
    const bl = self.left.right
    const cl = self.right
    const ar = that.left
    const br = that.right.left
    const cr = that.right.right
    return al.equalsSafe(ar).zipWith(
      bl.equalsSafe(br).zipWith(
        cl.equalsSafe(cr),
        (a, b) => a && b
      ),
      (a, b) => a && b
    )
  }
  return Eval.succeed(false)
}

function distributiveThen<A>(self: ParSeq<A>, that: ParSeq<A>): Eval<boolean> {
  return Eval.gen(function*(_) {
    if (
      self._tag === "Then" &&
      self.right._tag === "Both" &&
      that._tag === "Both" &&
      that.left._tag === "Then" &&
      that.right._tag === "Then"
    ) {
      const al = self.left
      const bl = self.right.left
      const cl = self.right.right
      const ar1 = that.left.left
      const br = that.left.right
      const ar2 = that.right.left
      const cr = that.right.right

      if (
        (yield* _(ar1.equalsSafe(ar2))) &&
        (yield* _(al.equalsSafe(ar1))) &&
        (yield* _(bl.equalsSafe(br))) &&
        (yield* _(cl.equalsSafe(cr)))
      ) {
        return true
      }
    }
    if (
      self._tag === "Then" &&
      self.left._tag === "Both" &&
      that._tag === "Both" &&
      that.left._tag === "Then" &&
      that.right._tag === "Then"
    ) {
      const al = self.left.left
      const bl = self.left.right
      const cl = self.right
      const ar = that.left.left
      const cr1 = that.left.right
      const br = that.right.left
      const cr2 = that.right.right

      if (
        (yield* _(cr1.equalsSafe(cr2))) &&
        (yield* _(al.equalsSafe(ar))) &&
        (yield* _(bl.equalsSafe(br))) &&
        (yield* _(cl.equalsSafe(cr1)))
      ) {
        return true
      }
    }
    return false
  })
}

function associativeBoth<A>(self: ParSeq<A>, that: ParSeq<A>): Eval<boolean> {
  return Eval.gen(function*(_) {
    if (
      self._tag === "Both" &&
      self.left._tag === "Both" &&
      that._tag === "Both" &&
      that.right._tag === "Both"
    ) {
      const al = self.left.left
      const bl = self.left.right
      const cl = self.right
      const ar = that.left
      const br = that.right.left
      const cr = that.right.right
      return (
        (yield* _(al.equalsSafe(ar))) &&
        (yield* _(bl.equalsSafe(br))) &&
        (yield* _(cl.equalsSafe(cr)))
      )
    }
    return false
  })
}

function distributiveBoth<A>(self: ParSeq<A>, that: ParSeq<A>): Eval<boolean> {
  return Eval.gen(function*(_) {
    if (
      self._tag === "Both" &&
      self.left._tag === "Then" &&
      self.right._tag === "Then" &&
      that._tag === "Then" &&
      that.right._tag === "Both"
    ) {
      const al1 = self.left.left
      const bl = self.left.right
      const al2 = self.right.left
      const cl = self.right.right
      const ar = that.left
      const br = that.right.left
      const cr = that.right.right

      if (
        (yield* _(al1.equalsSafe(al2))) &&
        (yield* _(al1.equalsSafe(ar))) &&
        (yield* _(bl.equalsSafe(br))) &&
        (yield* _(cl.equalsSafe(cr)))
      ) {
        return true
      }
    }
    if (
      self._tag === "Both" &&
      self.left._tag === "Then" &&
      self.right._tag === "Then" &&
      that._tag === "Then" &&
      that.left._tag === "Both"
    ) {
      const al = self.left.left
      const cl1 = self.left.right
      const bl = self.right.left
      const cl2 = self.right.right
      const ar = that.left.left
      const br = that.left.right
      const cr = that.right

      if (
        (yield* _(cl1.equalsSafe(cl2))) &&
        (yield* _(al.equalsSafe(ar))) &&
        (yield* _(bl.equalsSafe(br))) &&
        (yield* _(cl1.equalsSafe(cr)))
      ) {
        return true
      }
    }
    return false
  })
}

function commutativeBoth(self: Both<unknown>, that: ParSeq<unknown>): Eval<boolean> {
  if (that._tag === "Both") {
    return self.left.equalsSafe(that.right).zipWith(
      self.right.equalsSafe(that.left),
      (a, b) => a && b
    )
  }
  return Eval.succeed(false)
}

function zero<A>(self: ParSeq<A>, that: ParSeq<A>) {
  if (self._tag === "Then" && self.right._tag === "Empty") {
    return self.left.equalsSafe(that)
  }
  if (self._tag === "Then" && self.left._tag === "Empty") {
    return self.right.equalsSafe(that)
  }
  if (self._tag === "Both" && self.right._tag === "Empty") {
    return self.left.equalsSafe(that)
  }
  if (self._tag === "Both" && self.left._tag === "Empty") {
    return self.right.equalsSafe(that)
  }
  return Eval.succeed(false)
}

function symmetric<A>(f: (a: ParSeq<A>, b: ParSeq<A>) => Eval<boolean>) {
  return (a: ParSeq<A>, b: ParSeq<A>) =>
    Eval.gen(function*(_) {
      return (yield* _(f(a, b))) || (yield* _(f(b, a)))
    })
}

function hashCode(self: ParSeq<unknown>): number {
  const flat = flatten(self)
  const size = flat.length
  let head
  if (size === 0) {
    return _emptyHash
  } else if (size === 1 && (head = flat.unsafeHead!) && head.size === 1) {
    return List.make(head).unsafeHead![Hash.sym]()
  } else {
    return Hash.iterator(flat[Symbol.iterator]())
  }
}

/**
 * Empty collection of events
 *
 * @tsplus static ParSeq.Ops empty
 */
export function empty<A = never>(): ParSeq<A> {
  return new Empty()
}

/**
 * Constructs a new collection of events that contains the specified event.
 *
 * @tsplus static ParSeq.Ops single
 */
export function single<A>(a: A): ParSeq<A> {
  return new Single(a)
}

/**
 * Combines this collection of events with that collection of events to
 * return a new collection of events that represents this collection of
 * events in parallel with that collection of events.
 *
 * @tsplus static ParSeq.Ops combinePar
 */
export function combinePar_<A, A1>(left: ParSeq<A>, right: ParSeq<A1>): ParSeq<A | A1> {
  return left.isEmpty ? right : right.isEmpty ? left : new Both<A | A1>(left, right)
}

/**
 * Combines this collection of events with that collection of events to
 * return a new collection of events that represents this collection of
 * events in parallel with that collection of events.
 *
 * @tsplus static ParSeq.Aspects combinePar
 */
export const combinePar = Pipeable(combinePar_)

/**
 * Combines this collection of events with that collection of events to
 * return a new collection of events that represents this collection of
 * events followed by that collection of events.
 *
 * @tsplus static ParSeq.Ops combineSeq
 */
export function combineSeq_<A, A1>(left: ParSeq<A>, right: ParSeq<A1>): ParSeq<A | A1> {
  return left.isEmpty ? right : right.isEmpty ? left : new Then<A | A1>(left, right)
}

/**
 * Combines this collection of events with that collection of events to
 * return a new collection of events that represents this collection of
 * events followed by that collection of events.
 *
 * @tsplus static ParSeq.Aspects combineSeq
 */
export const combineSeq = Pipeable(combineSeq_)

/**
 * @tsplus static ParSeq.Ops isParSeq
 */
export function isParSeq(u: unknown): u is ParSeq<unknown> {
  return typeof u === "object" && u != null && ParSeqSym in u
}

/**
 * Checks if the ParSeq is empty.
 *
 * @tsplus getter ParSeq isEmpty
 */
export function isEmpty<A>(self: ParSeq<A>): boolean {
  return isEmptyLoop(List.make(self))
}

function isEmptyLoop<A>(self: List<ParSeq<A>>): boolean {
  while (!self.isNil()) {
    const head = self.head
    const tail = self.tail
    switch (head._tag) {
      case "Empty": {
        self = tail
        break
      }
      case "Single": {
        return false
      }
      case "Both": {
        self = tail.prepend(head.right).prepend(head.left)
        break
      }
      case "Then": {
        self = tail.prepend(head.right).prepend(head.left)
        break
      }
    }
  }
  return true
}

function flatten<A>(self: ParSeq<A>) {
  return flattenLoop(List(self), List.empty())
}

function flattenLoop<A>(
  causes: List<ParSeq<A>>,
  flattened: List<HashSet<ParSeq<A>>>
): List<HashSet<ParSeq<A>>> {
  // eslint-disable-next-line no-constant-condition
  while (1) {
    const [parallel, sequential] = causes.reduce(
      [HashSet.empty<ParSeq<A>>(), List.empty<ParSeq<A>>()] as const,
      ([parallel, sequential], cause) => {
        const [set, seq] = step(cause)
        return [parallel.union(set), sequential + seq]
      }
    )
    const updated = parallel.size > 0 ? flattened.prepend(parallel) : flattened
    if (sequential.isNil()) {
      return updated.reverse
    } else {
      causes = sequential
      flattened = updated
    }
  }
  throw new Error("Bug")
}

function step<A>(self: ParSeq<A>): readonly [HashSet<ParSeq<A>>, List<ParSeq<A>>] {
  return stepLoop(self, List.empty(), HashSet.empty(), List.empty())
}

function stepLoop<A>(
  cause: ParSeq<A>,
  stack: List<ParSeq<A>>,
  parallel: HashSet<ParSeq<A>>,
  sequential: List<ParSeq<A>>
): readonly [HashSet<ParSeq<A>>, List<ParSeq<A>>] {
  // eslint-disable-next-line no-constant-condition
  while (1) {
    switch (cause._tag) {
      case "Empty": {
        if (stack.isNil()) {
          return [parallel, sequential]
        } else {
          cause = stack.head!
          stack = stack.tail
        }
        break
      }
      case "Both": {
        stack = stack.prepend(cause.right)
        cause = cause.left
        break
      }
      case "Then": {
        const left = cause.left
        const right = cause.right
        switch (left._tag) {
          case "Empty": {
            cause = cause.right
            break
          }
          case "Then": {
            cause = combineSeq_(left.left, combineSeq_(left.right, right))
            break
          }
          case "Both": {
            cause = combinePar_(combineSeq_(left.left, right), combineSeq_(left.right, right))
            break
          }
          default: {
            cause = left
            sequential = sequential.prepend(right)
          }
        }
        break
      }
      default: {
        if (stack.isNil()) {
          return [parallel.add(cause), sequential]
        } else {
          parallel = parallel.add(cause)
          cause = stack.head
          stack = stack.tail
          break
        }
      }
    }
  }
  throw new Error("Bug")
}
