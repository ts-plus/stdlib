import { ImmutableArray } from "@tsplus/stdlib/collections/ImmutableArray"

describe.concurrent("ImmutableArray", () => {
  it("append", () => {
    assert.isTrue(
      ImmutableArray(0, 1) + 2
        == NonEmptyImmutableArray(0, 1, 2)
    )
  })

  it("collect", () => {
    const f = (n: number) => (n % 2 === 0 ? Maybe.none : Maybe.some(n))

    assert.isTrue(ImmutableArray(1, 2, 3).collect(f) == ImmutableArray(1, 3))
    assert.isTrue(ImmutableArray.empty<number>().collect(f) == ImmutableArray.empty<number>())
  })

  it("collectWithIndex", () => {
    const f = (i: number, n: number) => ((i + n) % 2 === 0 ? Maybe.none : Maybe.some(n))

    assert.isTrue(ImmutableArray(1, 2, 4).collectWithIndex(f) == ImmutableArray(1, 2))
    assert.isTrue(
      ImmutableArray.empty<number>().collectWithIndex(f) == ImmutableArray.empty<number>()
    )
  })

  it("compact", () => {
    assert.isTrue(ImmutableArray.empty<Maybe<number>>().compact == ImmutableArray.empty())
    assert.isTrue(
      ImmutableArray(Maybe.some(1), Maybe.some(2), Maybe.some(3)).compact == ImmutableArray(1, 2, 3)
    )
    assert.isTrue(
      ImmutableArray(Maybe.some(1), Maybe.none, Maybe.some(3)).compact == ImmutableArray(1, 3)
    )
  })

  it("compactF", () => {
    const compactF = ImmutableArray.compactF(Either.Applicative)((n: number) =>
      Either.right(n > 2 ? Maybe.some(n + 1) : Maybe.none)
    )

    assert.isTrue(compactF(ImmutableArray.empty()) == Either.right(ImmutableArray.empty()))
    assert.isTrue(compactF(ImmutableArray(1, 3)) == Either.right(ImmutableArray(4)))
  })

  it("compactWithIndexF", () => {
    const compactWithIndexF = ImmutableArray.compactWithIndexF(Either.Applicative)((i, n: number) =>
      Either.right((i + n) % 2 === 0 ? Maybe.some(n + 1) : Maybe.none)
    )

    assert.isTrue(compactWithIndexF(ImmutableArray.empty()) == Either.right(ImmutableArray.empty()))
    assert.isTrue(compactWithIndexF(ImmutableArray(1, 3)) == Either.right(ImmutableArray(4)))
  })

  it("concat", () => {
    assert.isTrue(ImmutableArray(0, 1) + ImmutableArray(2, 3) == ImmutableArray(0, 1, 2, 3))
  })

  it("do", () => {
    assert.deepStrictEqual(
      ImmutableArray.Do
        .bind("a", () => ImmutableArray("a"))
        .bindValue("b", () => "b"),
      ImmutableArray({ a: "a", b: "b" })
    )
  })

  it("difference", () => {
    assert.isTrue(
      ImmutableArray(1, 2).difference(Equivalence.number, ImmutableArray(3, 4)) ==
        ImmutableArray(1, 2)
    )
    assert.isTrue(
      ImmutableArray(1, 2).difference(Equivalence.number, ImmutableArray(2, 3)) == ImmutableArray(1)
    )
    assert.isTrue(
      ImmutableArray(1, 2).difference(Equivalence.number, ImmutableArray(1, 2)) ==
        ImmutableArray.empty()
    )
  })

  it("elem", () => {
    assert.isTrue(ImmutableArray(1, 2, 3).elem(Equivalence.number, 2))
    assert.isFalse(ImmutableArray(1, 2, 3).elem(Equivalence.number, 0))
  })

  it("equals", () => {
    assert.isTrue(
      ImmutableArray.from([1, 2])
        == ImmutableArray(1, 2)
    )
    assert.isFalse(
      ImmutableArray.from([1, 2])
        == ImmutableArray(1, 3)
    )
  })

  it("extend", () => {
    const sum: (self: ImmutableArray<number>) => number = AssociativeIdentity.fold(
      AssociativeIdentity.sum
    )

    assert.isTrue(ImmutableArray(1, 2, 3, 4).extend(sum) == ImmutableArray(10, 9, 7, 4))
    assert.isTrue(
      ImmutableArray(1, 2, 3, 4).extend(identity) ==
        ImmutableArray(
          ImmutableArray(1, 2, 3, 4),
          ImmutableArray(2, 3, 4),
          ImmutableArray(3, 4),
          ImmutableArray(4)
        )
    )
  })

  it("filter", () => {
    const g = (n: number) => n % 2 === 1
    const x = ImmutableArray(Maybe.some(3), Maybe.some(2), Maybe.some(1)).filter((_) => _.isSome())
    const y = ImmutableArray(Maybe.some(3), Maybe.none, Maybe.some(1)).filter((_) => _.isSome())

    assert.isTrue(ImmutableArray(1, 2, 3).filter(g) == ImmutableArray(1, 3))
    assert.isTrue(x == ImmutableArray(Maybe.some(3), Maybe.some(2), Maybe.some(1)))
    assert.isTrue(y == ImmutableArray(Maybe.some(3), Maybe.some(1)))
  })

  it("filterWithIndex", () => {
    const f = (n: number) => n % 2 === 0

    assert.isTrue(ImmutableArray("a", "b", "c").filterWithIndex(f) == ImmutableArray("a", "c"))
  })

  it("flatMap", () => {
    assert.isTrue(
      ImmutableArray(0, 1)
        .flatMap((n) => ImmutableArray(n + 1)) == ImmutableArray(1, 2)
    )
  })

  it("flatMap from collection", () => {
    assert.isTrue(
      ImmutableArray(0, 1)
        .flatMap((n) => [n + 1])
        .toImmutableArray == ImmutableArray(1, 2)
    )
  })

  it("flatten", () => {
    assert.isTrue(
      ImmutableArray(ImmutableArray(1), ImmutableArray(2), ImmutableArray(3)).flatten ==
        ImmutableArray(1, 2, 3)
    )
  })

  it("forEachF", () => {
    const forEachF = ImmutableArray.forEachF(Maybe.Applicative)(
      (n: number): Maybe<number> => (n % 2 === 0 ? Maybe.none : Maybe.some(n))
    )

    assert.isTrue(forEachF(ImmutableArray(1, 2)) == Maybe.none)
    assert.isTrue(forEachF(ImmutableArray(1, 3)) == Maybe.some(ImmutableArray(1, 3)))
  })

  it("forEachWithIndexF", () => {
    assert.isTrue(
      pipe(
        ImmutableArray("a", "bb"),
        ImmutableArray.forEachWithIndexF(Maybe.Applicative)(
          (i, s) => (s.length >= 1 ? Maybe.some(s + i) : Maybe.none)
        )
      ) == Maybe.some(ImmutableArray("a0", "bb1"))
    )
    assert.isTrue(
      pipe(
        ImmutableArray("a", "bb"),
        ImmutableArray.forEachWithIndexF(Maybe.Applicative)(
          (i, s) => (s.length > 1 ? Maybe.some(s + i) : Maybe.none)
        )
      ) == Maybe.none
    )
  })

  it("gen", () => {
    assert.isTrue(
      ImmutableArray.gen(function*($) {
        const a = yield* $(ImmutableArray(1))
        const b = yield* $(Maybe.some(2))
        return a + b
      }) == ImmutableArray(3)
    )
  })

  it("get", () => {
    assert.isTrue(ImmutableArray.empty().get(0) == Maybe.none)
    assert.isTrue(ImmutableArray(1, 2, 3).get(0) == Maybe.some(1))
  })

  it("getAssociativeIdentity", () => {
    const M = ImmutableArray.getAssociativeIdentity<number>()

    assert.isTrue(
      M.combine(ImmutableArray(1, 2), ImmutableArray(3, 4)) == ImmutableArray(1, 2, 3, 4)
    )
    assert.isTrue(M.combine(ImmutableArray(1, 2), M.identity) == ImmutableArray(1, 2))
    assert.isTrue(M.combine(M.identity, ImmutableArray(1, 2)) == ImmutableArray(1, 2))
  })

  it("getEquivalence", () => {
    const E = ImmutableArray.getEquivalence(Equivalence.string)

    assert.isTrue(E.equals(ImmutableArray.empty(), ImmutableArray.empty()))
    assert.isTrue(E.equals(ImmutableArray("a"), ImmutableArray("a")))
    assert.isTrue(E.equals(ImmutableArray("a", "b"), ImmutableArray("a", "b")))
    assert.isFalse(E.equals(ImmutableArray("a"), ImmutableArray.empty()))
  })

  it("getOrd", () => {
    const O = ImmutableArray.getOrd(Ord.string)

    assert.strictEqual(O.compare(ImmutableArray.empty(), ImmutableArray.empty()), 0)
    assert.strictEqual(O.compare(ImmutableArray("a"), ImmutableArray("a")), 0)
    assert.strictEqual(O.compare(ImmutableArray("b"), ImmutableArray("a")), 1)
    assert.strictEqual(O.compare(ImmutableArray("a"), ImmutableArray("b")), -1)
    assert.strictEqual(O.compare(ImmutableArray("a"), ImmutableArray.empty()), 1)
    assert.strictEqual(O.compare(ImmutableArray(), ImmutableArray("a")), -1)
    assert.strictEqual(O.compare(ImmutableArray("a", "a"), ImmutableArray("a")), 1)
    assert.strictEqual(O.compare(ImmutableArray("a", "a"), ImmutableArray("b")), -1)
    assert.strictEqual(O.compare(ImmutableArray("a", "a"), ImmutableArray("a", "a")), 0)
    assert.strictEqual(O.compare(ImmutableArray("a", "b"), ImmutableArray("a", "b")), 0)
    assert.strictEqual(O.compare(ImmutableArray("a", "a"), ImmutableArray("a", "b")), -1)
    assert.strictEqual(O.compare(ImmutableArray("a", "b"), ImmutableArray("a", "a")), 1)
    assert.strictEqual(O.compare(ImmutableArray("a", "b"), ImmutableArray("b", "a")), -1)
    assert.strictEqual(O.compare(ImmutableArray("b", "a"), ImmutableArray("a", "a")), 1)
    assert.strictEqual(O.compare(ImmutableArray("b", "a"), ImmutableArray("a", "b")), 1)
    assert.strictEqual(O.compare(ImmutableArray("b", "b"), ImmutableArray("b", "a")), 1)
    assert.strictEqual(O.compare(ImmutableArray("b", "a"), ImmutableArray("b", "b")), -1)
  })

  it("if", () => {
    const f = ImmutableArray.if(ImmutableArray(1), ImmutableArray(2))

    assert.isTrue(f(true) == ImmutableArray(1))
    assert.isTrue(f(false) == ImmutableArray(2))
  })

  it("index", () => {
    const array = ImmutableArray(0, 1, 2)
    assert.isTrue(array[0] == Maybe(0))
    assert.isTrue(array[1] == Maybe(1))
    assert.isTrue(array[2] == Maybe(2))
    assert.isTrue(array[3] == Maybe.none)
  })

  it("intersection", () => {
    assert.isTrue(
      ImmutableArray(1, 2).intersection(Equivalence.number, ImmutableArray(3, 4)) ==
        ImmutableArray.empty()
    )
    assert.isTrue(
      ImmutableArray(1, 2).intersection(Equivalence.number, ImmutableArray(2, 3)) ==
        ImmutableArray(2)
    )
    assert.isTrue(
      ImmutableArray(1, 2).intersection(Equivalence.number, ImmutableArray(1, 2)) ==
        ImmutableArray(1, 2)
    )
  })

  it("isEmpty", () => {
    assert.isTrue(ImmutableArray.empty().isEmpty)
    assert.isFalse(ImmutableArray(1).isEmpty)
  })

  it("isNonEmpty", () => {
    assert.isTrue(ImmutableArray(1).isNonEmpty())
    assert.isFalse(ImmutableArray.empty().isNonEmpty())
  })

  it("map", () => {
    assert.isTrue(ImmutableArray(0, 1).map((n) => n + 1) == ImmutableArray(1, 2))
  })

  it("partition", () => {
    assert.isTrue(
      ImmutableArray.empty<number>().partition((n) => n > 2) ==
        [ImmutableArray.empty(), ImmutableArray.empty()]
    )
    assert.isTrue(
      ImmutableArray(1, 3).partition((n) => n > 2) == [ImmutableArray(1), ImmutableArray(3)]
    )
  })

  it("partitionMap", () => {
    assert.isTrue(
      ImmutableArray.empty<Either<string, number>>().partitionMap(identity) ==
        [ImmutableArray.empty(), ImmutableArray.empty()]
    )
    assert.isTrue(
      ImmutableArray(Either.right(1), Either.left("foo"), Either.right(2)).partitionMap(identity) ==
        [ImmutableArray("foo"), ImmutableArray(1, 2)]
    )
  })

  it("partitionMapWithIndex", () => {
    assert.isTrue(
      ImmutableArray.empty<Either<string, number>>().partitionMapWithIndex((_, a) => a) ==
        [ImmutableArray.empty(), ImmutableArray.empty()]
    )
    assert.isTrue(
      ImmutableArray(Either.right(1), Either.left("foo"), Either.right(2)).partitionMapWithIndex((
        i,
        a
      ) => a.filterOrElse((n) => n > i, () => "error")) ==
        [ImmutableArray("foo", "error"), ImmutableArray(1)]
    )
  })

  it("partitionWithIndex", () => {
    assert.isTrue(
      ImmutableArray.empty<number>().partitionWithIndex((i, n) => i + n > 2) ==
        [ImmutableArray.empty(), ImmutableArray.empty()]
    )
    assert.isTrue(
      ImmutableArray(1, 2).partitionWithIndex((i, n) => i + n > 2) ==
        [ImmutableArray(1), ImmutableArray(2)]
    )
  })

  it("prepend", () => {
    assert.isTrue(0 + ImmutableArray(1) == NonEmptyImmutableArray(0, 1))
  })

  it("sequence", () => {
    const sequence = ImmutableArray.sequence(Maybe.Applicative)

    assert.isTrue(
      sequence(ImmutableArray(Maybe.some(1), Maybe.some(3))) == Maybe.some(ImmutableArray(1, 3))
    )
    assert.isTrue(sequence(ImmutableArray(Maybe.some(1), Maybe.none)) == Maybe.none)
  })

  it("separate", () => {
    assert.isTrue(
      ImmutableArray.empty<Either<string, number>>().separate ==
        [ImmutableArray.empty(), ImmutableArray.empty()]
    )
    assert.isTrue(
      ImmutableArray(Either.left(123), Either.right("123")).separate ==
        [ImmutableArray(123), ImmutableArray("123")]
    )
  })

  it("struct", () => {
    assert.deepStrictEqual(
      ImmutableArray.struct({
        a: ImmutableArray(1, 2, 3),
        b: ImmutableArray(4, 5, 6)
      }),
      ImmutableArray(
        { a: 1, b: 4 },
        { a: 1, b: 5 },
        { a: 1, b: 6 },
        { a: 2, b: 4 },
        { a: 2, b: 5 },
        { a: 2, b: 6 },
        { a: 3, b: 4 },
        { a: 3, b: 5 },
        { a: 3, b: 6 }
      )
    )
  })

  it("structZip", () => {
    assert.deepStrictEqual(
      ImmutableArray.structZip({
        a: ImmutableArray(1, 2, 3),
        b: ImmutableArray(4, 5, 6)
      }),
      ImmutableArray(
        { a: 1, b: 4 },
        { a: 2, b: 5 },
        { a: 3, b: 6 }
      )
    )
  })

  it("size", () => {
    assert.equal(ImmutableArray(0, 1, 2).size, 3)
  })

  it("tuple", () => {
    assert.deepStrictEqual(
      ImmutableArray.tuple(ImmutableArray(1, 2, 3), ImmutableArray(4, 5, 6)),
      ImmutableArray(
        [1, 4],
        [1, 5],
        [1, 6],
        [2, 4],
        [2, 5],
        [2, 6],
        [3, 4],
        [3, 5],
        [3, 6]
      )
    )
  })

  it("tupleZip", () => {
    assert.deepStrictEqual(
      ImmutableArray.tupleZip(ImmutableArray(1, 2, 3), ImmutableArray(4, 5, 6)),
      ImmutableArray([1, 4], [2, 5], [3, 6])
    )
  })

  it("separateF", () => {
    const separateF = ImmutableArray.separateF(Maybe.Applicative)((n: number) =>
      Maybe.some(n > 2 ? Either.right(n + 1) : Either.left(n - 1))
    )

    assert.isTrue(
      separateF(ImmutableArray.empty<number>()) ==
        Maybe.some([ImmutableArray.empty(), ImmutableArray.empty()])
    )
    assert.isTrue(
      separateF(ImmutableArray(1, 3)) == Maybe.some([ImmutableArray(0), ImmutableArray(4)])
    )
  })

  it("separateWithIndexF", () => {
    const separateWithIndexF = ImmutableArray.separateWithIndexF(Maybe.Applicative)((
      i,
      n: number
    ) => Maybe.some(n > 2 ? Either.right(n + i) : Either.left(n - i)))

    assert.isTrue(
      separateWithIndexF(ImmutableArray.empty<number>()) ==
        Maybe.some([ImmutableArray.empty(), ImmutableArray.empty()])
    )
    assert.isTrue(
      separateWithIndexF(ImmutableArray(1, 3)) ==
        Maybe.some([ImmutableArray(1), ImmutableArray(4)])
    )
  })

  it("size", () => {
    assert.strictEqual(ImmutableArray.empty().size, 0)
    assert.strictEqual(ImmutableArray(1, 2, 3).size, 3)
  })

  it("sort", () => {
    const byName = Ord.string.contramap((x: { readonly name: string }) => x.name)

    assert.isTrue(ImmutableArray.empty<number>().sort(Ord.number) == ImmutableArray.empty())
    assert.isTrue(ImmutableArray(3, 2, 1).sort(Ord.number) == ImmutableArray(1, 2, 3))
    assert.deepStrictEqual(
      ImmutableArray(
        { name: "b", age: 0 },
        { name: "a", age: 1 },
        { name: "c", age: 2 }
      ).sort(byName),
      ImmutableArray(
        { name: "a", age: 1 },
        { name: "b", age: 0 },
        { name: "c", age: 2 }
      )
    )
  })

  it("sortBy", () => {
    interface Person {
      readonly name: string
      readonly age: number
    }
    const byName = Ord.string.contramap((person: Person) => person.name)
    const byAge = Ord.number.contramap((person: Person) => person.age)
    const f = ImmutableArray.$.sortBy(byName, byAge)
    const g = ImmutableArray.$.sortBy(byAge, byName)
    const persons: ImmutableArray<Person> = ImmutableArray(
      { name: "a", age: 1 },
      { name: "b", age: 3 },
      { name: "c", age: 2 },
      { name: "b", age: 2 }
    )

    assert.isTrue(f(ImmutableArray.empty<Person>()) == ImmutableArray.empty())
    assert.deepStrictEqual(persons.sortBy(), persons)
    assert.deepStrictEqual(
      f(persons),
      ImmutableArray(
        { name: "a", age: 1 },
        { name: "b", age: 2 },
        { name: "b", age: 3 },
        { name: "c", age: 2 }
      )
    )
    assert.deepStrictEqual(
      g(persons),
      ImmutableArray(
        { name: "a", age: 1 },
        { name: "b", age: 2 },
        { name: "c", age: 2 },
        { name: "b", age: 3 }
      )
    )
  })

  it("union", () => {
    const two: ImmutableArray<number> = ImmutableArray(1, 2)

    assert.isTrue(two.union(Equivalence.number, ImmutableArray(3, 4)) == ImmutableArray(1, 2, 3, 4))
    assert.isTrue(two.union(Equivalence.number, ImmutableArray(2, 3)) == ImmutableArray(1, 2, 3))
    assert.isTrue(two.union(Equivalence.number, ImmutableArray(1, 2)) == ImmutableArray(1, 2))
    assert.isTrue(two.union(Equivalence.number, ImmutableArray.empty()) == ImmutableArray(1, 2))
    assert.isTrue(
      ImmutableArray.empty<number>().union(Equivalence.number, two) == ImmutableArray(1, 2)
    )
    assert.isTrue(
      ImmutableArray.empty<number>().union(Equivalence.number, ImmutableArray.empty()) ==
        ImmutableArray.empty()
    )
  })

  it("uniq", () => {
    interface A {
      readonly a: string
      readonly b: number
    }

    const E = Equivalence.number.contramap((a: A) => a.b)
    const arrA: A = { a: "a", b: 1 }
    const arrB: A = { a: "b", b: 1 }
    const arrC: A = { a: "c", b: 2 }
    const arrD: A = { a: "d", b: 2 }
    const arrUniq: ImmutableArray<A> = ImmutableArray(arrA, arrC)

    assert.isTrue(arrUniq.uniq(E) == arrUniq)
    assert.isTrue(ImmutableArray(arrA, arrB, arrC, arrD).uniq(E) == ImmutableArray(arrA, arrC))
    assert.isTrue(ImmutableArray(arrB, arrA, arrC, arrD).uniq(E) == ImmutableArray(arrB, arrC))
    assert.isTrue(
      ImmutableArray(arrA, arrA, arrC, arrD, arrA).uniq(E) == ImmutableArray(arrA, arrC)
    )
    assert.isTrue(ImmutableArray(arrA, arrC).uniq(E) == ImmutableArray(arrA, arrC))
    assert.isTrue(ImmutableArray(arrC, arrA).uniq(E) == ImmutableArray(arrC, arrA))
    assert.isTrue(
      ImmutableArray(true, false, true, false).uniq(Equivalence.boolean) ==
        ImmutableArray(true, false)
    )
    assert.isTrue(ImmutableArray.empty<number>().uniq(Equivalence.number) == ImmutableArray.empty())
    assert.isTrue(ImmutableArray(-0, -0).uniq(Equivalence.number) == ImmutableArray(-0))
    assert.isTrue(ImmutableArray(0, -0).uniq(Equivalence.number) == ImmutableArray(0))
    assert.isTrue(ImmutableArray(1).uniq(Equivalence.number) == ImmutableArray(1))
    assert.isTrue(ImmutableArray(2, 1, 2).uniq(Equivalence.number) == ImmutableArray(2, 1))
    assert.isTrue(ImmutableArray(1, 2, 1).uniq(Equivalence.number) == ImmutableArray(1, 2))
    assert.isTrue(
      ImmutableArray(1, 2, 3, 4, 5).uniq(Equivalence.number) == ImmutableArray(1, 2, 3, 4, 5)
    )
    assert.isTrue(
      ImmutableArray(1, 1, 2, 2, 3, 3, 4, 4, 5, 5).uniq(Equivalence.number) ==
        ImmutableArray(1, 2, 3, 4, 5)
    )
    assert.isTrue(
      ImmutableArray(1, 2, 3, 4, 5, 1, 2, 3, 4, 5).uniq(Equivalence.number) ==
        ImmutableArray(1, 2, 3, 4, 5)
    )
    assert.isTrue(
      ImmutableArray("a", "b", "a").uniq(Equivalence.string) == ImmutableArray("a", "b")
    )
    assert.isTrue(
      ImmutableArray("a", "b", "A").uniq(Equivalence.string) == ImmutableArray("a", "b", "A")
    )
  })

  it("zip", () => {
    assert.isTrue(
      ImmutableArray.empty<number>().zip(ImmutableArray(1, 2, 3)) == ImmutableArray.empty()
    )
    assert.isTrue(
      ImmutableArray(1, 2, 3).zip(ImmutableArray("a", "b", "c")) ==
        ImmutableArray([1, "a"], [2, "b"], [3, "c"])
    )
  })
})
