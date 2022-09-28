describe.concurrent("Chunk", () => {
  it("append", () => {
    const chunkA = Chunk.single(1).append(2).append(3).append(4).append(5)
    const chunkB = Chunk(1, 2, 3, 4, 5)

    assert.isTrue(chunkA == chunkB)
  })

  it("arrayLikeIterator", () => {
    const chunk = Chunk.single(0) + Chunk.single(1) + Chunk.single(2) + Chunk.single(3)

    const result = Array.from(chunk.buckets)

    assert.deepEqual(result, [Buffer.of(0), Buffer.of(1), Buffer.of(2), Buffer.of(3)])
  })

  it("buffer", () => {
    const chunk = Chunk.from(Buffer.from("hello")) +
      Chunk.from(Buffer.from(" ")) +
      Chunk.from(Buffer.from("world"))

    const result = chunk.drop(6).append(32).prepend(32).toArrayLike

    assert.deepEqual(result, Buffer.from(" world "))
  })

  it("compactF", () => {
    const compactF = Chunk.compactF(Either.Applicative)((n: number) =>
      Either.right(n > 2 ? Maybe.some(n + 1) : Maybe.none)
    )

    assert.isTrue(compactF(Chunk.empty()) == Either.right(Chunk.empty()))
    assert.isTrue(compactF(Chunk(1, 3)) == Either.right(Chunk(4)))
  })

  it("compactWithIndexF", () => {
    const compactWithIndexF = Chunk.compactWithIndexF(Either.Applicative)((i, n: number) =>
      Either.right((i + n) % 2 === 0 ? Maybe.some(n + 1) : Maybe.none)
    )

    assert.isTrue(compactWithIndexF(Chunk.empty()) == Either.right(Chunk.empty()))
    assert.isTrue(compactWithIndexF(Chunk(1, 3)) == Either.right(Chunk(4)))
  })

  it("concat", () => {
    const chunkA = Chunk(1, 2, 3, 4, 5) + Chunk(6, 7, 8, 9, 10)
    const chunkB = Chunk(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

    assert.isTrue(chunkA == chunkB)
  })

  it("dedupe", () => {
    const chunk = Chunk(0, 0, 1, 2, 3, 4, 4, 5, 6, 7, 7, 7, 8, 9, 9, 9, 9)

    const result = chunk.dedupe.toImmutableArray

    assert.deepEqual(result, ImmutableArray(0, 1, 2, 3, 4, 5, 6, 7, 8, 9))
  })

  it("difference", () => {
    assert.isTrue(Chunk(1, 2).difference(Equivalence.number, Chunk(3, 4)) == Chunk(1, 2))
    assert.isTrue(Chunk(1, 2).difference(Equivalence.number, Chunk(2, 3)) == Chunk(1))
    assert.isTrue(Chunk(1, 2).difference(Equivalence.number, Chunk(1, 2)) == Chunk.empty<number>())
  })

  it("drop", () => {
    const chunk = Chunk(1, 2, 3, 4, 5) + Chunk(6, 7, 8, 9, 10)

    const result = chunk.drop(5).toImmutableArray

    assert.isTrue(result == ImmutableArray(6, 7, 8, 9, 10))
  })

  it("dropRight", () => {
    const chunk = Chunk(1, 2, 3, 4, 5, 6, 7)

    const result = chunk.dropRight(3).toImmutableArray

    assert.isTrue(result == ImmutableArray(1, 2, 3, 4))
  })

  it("dropWhile", () => {
    const chunk = Chunk(0, 1, 2, 3, 4)

    const result = chunk.dropWhile((n) => n < 2).toImmutableArray

    assert.isTrue(result == ImmutableArray(2, 3, 4))
  })

  it("elem", () => {
    assert.isTrue(Chunk(1, 2, 3).elem(Equivalence.number, 2))
    assert.isFalse(Chunk(1, 2, 3).elem(Equivalence.number, 0))
  })

  it("equals", () => {
    const chunkA = Chunk.single(0) +
      Chunk.single(1) +
      Chunk.single(2) +
      Chunk.single(3) +
      Chunk.single(4)
    const chunkB = Chunk.single(0).append(1).append(2).append(3).append(4)

    assert.isTrue(chunkA == chunkB)
  })

  it("equality", () => {
    const chunk = Chunk(0, 1, 2)

    const result = chunk.equals(Chunk.from([0, 1, 2]))

    assert.isTrue(result)
  })

  it("exists", () => {
    const chunk = Chunk(0, 1, 2, 3, 4)

    assert.isTrue(chunk.exists((n) => n === 3))
    assert.isFalse(chunk.exists((n) => n === 6))
  })

  it("extend", () => {
    const sum: (self: Chunk<number>) => number = AssociativeIdentity.fold(AssociativeIdentity.sum)

    assert.isTrue(Chunk(1, 2, 3, 4).extend(sum) == Chunk(10, 9, 7, 4))
    assert.isTrue(
      Chunk(1, 2, 3, 4).extend(identity) ==
        Chunk(Chunk(1, 2, 3, 4), Chunk(2, 3, 4), Chunk(3, 4), Chunk(4))
    )
  })

  it("fill", () => {
    const chunk = Chunk.fill(10, (n) => n + 1)

    const result = chunk.toImmutableArray

    assert.isTrue(result == ImmutableArray(1, 2, 3, 4, 5, 6, 7, 8, 9, 10))
  })

  it("find", () => {
    const chunk = Chunk(0, 1, 2, 3, 4)

    assert.isTrue(chunk.find((n) => n > 2) == Maybe.some(3))
    assert.isTrue(chunk.find((n) => n === 6) == Maybe.none)
  })

  it("find & concat", () => {
    const chunk = Chunk(4, 5, 6) + Chunk(1, 2, 3)
    const result = chunk.find((v) => v === 3)

    assert.isTrue(result == Maybe.some(3))
  })

  it("findIndex", () => {
    const chunk = Chunk(1, 2, 3, 4, 5, 6, 7)

    const result = chunk.findIndex((n) => n === 5)

    assert.isTrue(result == Maybe.some(4))
  })

  it("findLast - found", () => {
    const chunk = Chunk(1, 2, 3, 4, 5, 6, 7, 5, 9, 10).mapWithIndex((i, n) => ({
      id: i,
      n
    }))

    const result = chunk.findLast(({ n }) => n === 5)

    assert.deepEqual(result, Maybe.some({ id: 7, n: 5 }))
  })

  it("findLast - not found", () => {
    const chunk = Chunk(1, 2, 3, 4, 5, 6, 7, 5, 9, 10).mapWithIndex((i, n) => ({
      id: i,
      n
    }))

    const result = chunk.findLast(({ n }) => n === 25)

    assert.isTrue(result == Maybe.none)
  })

  it("findLastIndex - found", () => {
    const chunk = Chunk(1, 2, 3, 4, 5, 6, 7, 5, 9, 10).mapWithIndex((i, n) => ({
      id: i,
      n
    }))

    const result = chunk.findLastIndex(({ n }) => n === 5)

    assert.isTrue(result == Maybe.some(7))
  })

  it("findLastIndex - not found", () => {
    const chunk = Chunk(1, 2, 3, 4, 5, 6, 7, 5, 9, 10).mapWithIndex((i, n) => ({
      id: i,
      n
    }))

    const result = chunk.findLastIndex(({ n }) => n === 25)

    assert.isTrue(result == Maybe.none)
  })

  it("filter", () => {
    const chunk = Chunk(0, 1, 2, 3, 4)

    const result = chunk.filter((n) => n >= 2).toImmutableArray

    assert.isTrue(result == ImmutableArray(2, 3, 4))
  })

  it("flatMap", () => {
    const chunk = Chunk.from(Buffer.from("hello-world"))

    const result = chunk
      .flatMap((n) => (n === 45 ? Chunk.from(Buffer.from("-|-")) : Chunk.single(n)))
      .toArrayLike

    assert.deepEqual(result, Buffer.from("hello-|-world"))
  })

  it("forEachF", () => {
    const forEachF = Chunk.forEachF(Maybe.Applicative)(
      (n: number): Maybe<number> => (n % 2 === 0 ? Maybe.none : Maybe.some(n))
    )

    assert.isTrue(forEachF(Chunk(1, 2)) == Maybe.none)
    assert.isTrue(forEachF(Chunk(1, 3)) == Maybe.some(Chunk(1, 3)))
  })

  it("forEachWithIndexF", () => {
    assert.isTrue(
      pipe(
        Chunk("a", "bb"),
        Chunk.forEachWithIndexF(Maybe.Applicative)(
          (i, s) => (s.length >= 1 ? Maybe.some(s + i) : Maybe.none)
        )
      ) == Maybe.some(Chunk("a0", "bb1"))
    )
    assert.isTrue(
      pipe(
        Chunk("a", "bb"),
        Chunk.forEachWithIndexF(Maybe.Applicative)(
          (i, s) => (s.length > 1 ? Maybe.some(s + i) : Maybe.none)
        )
      ) == Maybe.none
    )
  })

  it("fromArray", () => {
    const chunkA = Chunk.from([1, 2, 3, 4, 5]).append(6).append(7)
    const chunkB = Chunk(1, 2, 3, 4, 5, 6, 7)

    assert.isTrue(chunkA == chunkB)
  })

  it("get", () => {
    const chunk = Chunk(1, 2, 3, 4, 5)

    assert.isTrue(chunk.get(3) == Maybe.some(4))
    assert.isTrue(chunk.get(5) == Maybe.none)
  })

  it("indexWhere", () => {
    const chunk = Chunk(0, 1, 2, 1, 3, 4)

    const result = chunk.indexWhere((n) => n > 2)

    assert.strictEqual(result, 4)
  })

  it("indexWhereFrom", () => {
    const chunk = Chunk(0, 1, 2, 1, 3, 4)

    const result = chunk.indexWhereFrom(2, (n) => n > 2)

    assert.strictEqual(result, 4)
  })

  it("intersection", () => {
    assert.isTrue(
      Chunk(1, 2).intersection(Equivalence.number, Chunk(3, 4)) == Chunk.empty<number>()
    )
    assert.isTrue(Chunk(1, 2).intersection(Equivalence.number, Chunk(2, 3)) == Chunk(2))
    assert.isTrue(Chunk(1, 2).intersection(Equivalence.number, Chunk(1, 2)) == Chunk(1, 2))
  })

  it("iterable", () => {
    const chunk = Chunk(0, 1, 2).toArrayLike

    assert.deepEqual(chunk, Buffer.of(0, 1, 2))
  })

  it("map", () => {
    const chunk = Chunk.from(Buffer.from("hello-world"))

    const result = chunk.map((n) => (n === 45 ? 32 : n)).toArrayLike

    assert.deepEqual(result, Buffer.from("hello world"))
  })

  it("mapWithIndex", () => {
    const chunk = Chunk(1, 2, 3, 4, 5, 6, 7)

    const result = chunk.mapWithIndex((i, n) => [i, n]).toImmutableArray

    assert.isTrue(
      result ==
        ImmutableArray(
          [0, 1],
          [1, 2],
          [2, 3],
          [3, 4],
          [4, 5],
          [5, 6],
          [6, 7]
        )
    )
  })

  it("partition", () => {
    assert.isTrue(
      Chunk.empty<number>().partition((n) => n > 2) ==
        [Chunk.empty<number>(), Chunk.empty<number>()]
    )
    assert.isTrue(Chunk(1, 3).partition((n) => n > 2) == [Chunk(1), Chunk(3)])
  })

  it("partitionMap", () => {
    assert.isTrue(
      Chunk.empty<Either<string, number>>().partitionMap(identity) ==
        [Chunk.empty<string>(), Chunk.empty<number>()]
    )
    assert.isTrue(
      Chunk(Either.right(1), Either.left("foo"), Either.right(2)).partitionMap(identity) ==
        [Chunk("foo"), Chunk(1, 2)]
    )
  })

  it("partitionMapWithIndex", () => {
    assert.isTrue(
      Chunk.empty<Either<string, number>>().partitionMapWithIndex((_, a) => a) ==
        [Chunk.empty<string>(), Chunk.empty<number>()]
    )
    assert.isTrue(
      Chunk(Either.right(1), Either.left("foo"), Either.right(2))
        .partitionMapWithIndex((i, a) => a.filterOrElse((n) => n > i, () => "woops")) ==
        [Chunk("foo", "woops"), Chunk(1)]
    )
  })

  it("partitionWithIndex", () => {
    assert.isTrue(
      Chunk.empty<number>().partitionWithIndex((i, n) => i + n > 2) ==
        [Chunk.empty<number>(), Chunk.empty<number>()]
    )
    assert.isTrue(Chunk(1, 2).partitionWithIndex((i, n) => i + n > 2) == [Chunk(1), Chunk(2)])
  })

  it("prepend", () => {
    const chunkA = Chunk.single(1).prepend(2).prepend(3).prepend(4).prepend(5)
    const chunkB = Chunk(5, 4, 3, 2, 1)

    assert.isTrue(chunkA == chunkB)
  })

  it("reduceWithIndex", () => {
    const chunk = Chunk(1, 2, 3, 4, 5, 6, 7)

    const result = chunk.reduceWithIndex(
      ImmutableArray.empty<readonly [number, number]>(),
      (i, acc, n) => acc + [i, n]
    )

    assert.isTrue(
      result == ImmutableArray(
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        [6, 7]
      )
    )
  })

  it("reduceRightWithIndex", () => {
    const chunk = Chunk(1, 2, 3, 4, 5, 6, 7)

    const result = chunk.reduceRightWithIndex(
      ImmutableArray.empty<readonly [number, number]>(),
      (i, n, acc) => acc + [i, n]
    )

    assert.isTrue(
      result ==
        ImmutableArray(
          [6, 7],
          [5, 6],
          [4, 5],
          [3, 4],
          [2, 3],
          [1, 2],
          [0, 1]
        )
    )
  })

  it("separate", () => {
    const chunk = Chunk(1, 2, 3, 4, 5, 6).map((n) =>
      n % 2 === 0 ? Either.right(n) : Either.left(n.toString())
    )

    const result = chunk.separate

    assert.isTrue(result == [Chunk("1", "3", "5"), Chunk(2, 4, 6)])
  })

  it("separateF", () => {
    const separateF = Chunk.separateF(Maybe.Applicative)((n: number) =>
      Maybe.some(n > 2 ? Either.right(n + 1) : Either.left(n - 1))
    )

    assert.isTrue(
      separateF(Chunk.empty<number>()) == Maybe.some([Chunk.empty(), Chunk.empty()])
    )
    assert.isTrue(separateF(Chunk(1, 3)) == Maybe.some([Chunk(0), Chunk(4)]))
  })

  it("separateWithIndexF", () => {
    const separateWithIndexF = Chunk.separateWithIndexF(Maybe.Applicative)((i, n: number) =>
      Maybe.some(n > 2 ? Either.right(n + i) : Either.left(n - i))
    )

    assert.isTrue(
      separateWithIndexF(Chunk.empty<number>()) ==
        Maybe.some([Chunk.empty(), Chunk.empty()])
    )
    assert.isTrue(separateWithIndexF(Chunk(1, 3)) == Maybe.some([Chunk(1), Chunk(4)]))
  })

  describe.concurrent("sort", () => {
    it("simple", () => {
      assert.isTrue(Chunk(3, 2, 1).sort(Ord.number) == Chunk(1, 2, 3))
      assert.isTrue(Chunk.empty<number>().sort(Ord.number) == Chunk.empty<number>())
    })

    it("complex", () => {
      class Person implements Equals {
        constructor(readonly name: string, readonly age: number) {}

        [Hash.sym](): number {
          return Hash.combine(Hash.string(this.name), Hash.number(this.age))
        }

        [Equals.sym](u: unknown): boolean {
          return u instanceof Person && this.name === u.name && this.age === u.age
        }
      }

      const chunk = Chunk(
        new Person("b", 0),
        new Person("a", 1),
        new Person("c", 2)
      )
      const byName = Ord.string.contramap((x: Person) => x.name)

      const result = chunk.sort(byName)

      assert.isTrue(
        result ==
          Chunk(
            new Person("a", 1),
            new Person("b", 0),
            new Person("c", 2)
          )
      )
    })
  })

  it("sortBy", () => {
    class Person implements Equals {
      constructor(readonly name: string, readonly age: number) {}

      [Hash.sym](): number {
        return Hash.combine(Hash.string(this.name), Hash.number(this.age))
      }

      [Equals.sym](u: unknown): boolean {
        return u instanceof Person && this.name === u.name && this.age === u.age
      }
    }

    const people = Chunk(
      new Person("a", 1),
      new Person("b", 3),
      new Person("c", 2),
      new Person("b", 2)
    )
    const byName = Ord.string.contramap((x: Person) => x.name)
    const byAge = Ord.number.contramap((x: Person) => x.age)

    assert.isTrue(
      people.sortBy(byName, byAge) ==
        Chunk(
          new Person("a", 1),
          new Person("b", 2),
          new Person("b", 3),
          new Person("c", 2)
        )
    )
    assert.isTrue(
      people.sortBy(byAge, byName) ==
        Chunk(
          new Person("a", 1),
          new Person("b", 2),
          new Person("c", 2),
          new Person("b", 3)
        )
    )
    assert.isTrue(Chunk.empty<Person>().sortBy() == Chunk.empty<Person>())
    assert.isTrue(Chunk.empty<Person>().sortBy(byName, byAge) == Chunk.empty<Person>())
    assert.isTrue(people.sortBy() == people)
  })

  it("split", () => {
    function flattenArray(
      chunk: Chunk<Chunk<number>>
    ): ImmutableArray<ImmutableArray<number>> {
      return chunk.map((_) => _.toImmutableArray).toImmutableArray
    }

    const chunk = Chunk(0, 1, 2, 3, 4, 5)

    assert.isTrue(
      flattenArray(chunk.split(2)) ==
        ImmutableArray(ImmutableArray(0, 1, 2), ImmutableArray(3, 4, 5))
    )
    assert.isTrue(
      flattenArray(chunk.split(4)) ==
        ImmutableArray(
          ImmutableArray(0, 1),
          ImmutableArray(2, 3),
          ImmutableArray(4),
          ImmutableArray(5)
        )
    )
    assert.isTrue(
      flattenArray(chunk.split(5)) ==
        ImmutableArray(
          ImmutableArray(0, 1),
          ImmutableArray(2),
          ImmutableArray(3),
          ImmutableArray(4),
          ImmutableArray(5)
        )
    )
  })

  it("splitWhere", () => {
    const chunk = Chunk(0, 1, 2, 3, 4, 5)

    const [left, right] = chunk.splitWhere((n) => n === 3)

    assert.isTrue(left == Chunk(0, 1, 2))
    assert.isTrue(right == Chunk(3, 4, 5))
  })

  it("spread", () => {
    const f = (...args: number[]) => args

    assert.deepEqual(f(...Chunk(0, 1, 2)), [0, 1, 2])
  })

  it("stack", () => {
    let a = Chunk.empty<number>()
    for (let i = 0; i < 100_000; i++) {
      a = a + Chunk(i, i)
    }

    const result = a.toArrayLike

    assert.strictEqual(result.length, 200_000)
  })

  it("take", () => {
    const chunk = Chunk(1, 2, 3, 4, 5) + Chunk(6, 7, 8, 9, 10)

    const result = chunk.take(5).toImmutableArray

    assert.isTrue(result == ImmutableArray(1, 2, 3, 4, 5))
  })

  it("takeRight", () => {
    const chunk = Chunk(1, 2, 3, 4, 5) + Chunk(6, 7, 8, 9, 10)

    const result = chunk.takeRight(5).toImmutableArray

    assert.isTrue(result == ImmutableArray(6, 7, 8, 9, 10))
  })

  it("union", () => {
    assert.isTrue(Chunk(1, 2).union(Equivalence.number, Chunk(3, 4)) == Chunk(1, 2, 3, 4))
    assert.isTrue(Chunk(1, 2).union(Equivalence.number, Chunk(2, 3)) == Chunk(1, 2, 3))
    assert.isTrue(Chunk(1, 2).union(Equivalence.number, Chunk(1, 2)) == Chunk(1, 2))
    assert.isTrue(Chunk(1, 2).union(Equivalence.number, Chunk.empty<number>()) == Chunk(1, 2))
    assert.isTrue(Chunk.empty<number>().union(Equivalence.number, Chunk(1, 2)) == Chunk(1, 2))
    assert.isTrue(
      Chunk.empty<number>().union(Equivalence.number, Chunk.empty<number>()) ==
        Chunk.empty<number>()
    )
  })

  it("uniq", () => {
    interface A {
      readonly a: string
      readonly b: number
    }

    const E = Equivalence.struct({
      a: Equivalence.string,
      b: Equivalence.number
    })

    const a: A = { a: "a", b: 1 }
    const b: A = { a: "b", b: 1 }
    const c: A = { a: "c", b: 2 }
    const d: A = { a: "d", b: 2 }

    assert.isTrue(Chunk(a, c).uniq(E) == Chunk(a, c))
    assert.isTrue(Chunk(c, a).uniq(E) == Chunk(c, a))
    assert.isTrue(Chunk(a, b, b, a).uniq(E) == Chunk(a, b))
    assert.isTrue(Chunk(b, a, c, d).uniq(E) == Chunk(b, a, c, d))
    assert.isTrue(Chunk(a, a, c, d, a).uniq(E) == Chunk(a, c, d))
    assert.isTrue(Chunk(true, false, true, false).uniq(Equivalence.boolean) == Chunk(true, false))
    assert.isTrue(Chunk.empty<boolean>().uniq(Equivalence.boolean) == Chunk.empty<boolean>())
    assert.isTrue(Chunk(-0, -0).uniq(Equivalence.number) == Chunk(-0))
    assert.isTrue(Chunk(0, -0).uniq(Equivalence.number) == Chunk(0))
    assert.isTrue(Chunk(1).uniq(Equivalence.number) == Chunk(1))
    assert.isTrue(Chunk(2, 1, 2).uniq(Equivalence.number) == Chunk(2, 1))
    assert.isTrue(Chunk(1, 2, 1).uniq(Equivalence.number) == Chunk(1, 2))
    assert.isTrue(Chunk(1, 2, 3, 4, 5).uniq(Equivalence.number) == Chunk(1, 2, 3, 4, 5))
    assert.isTrue(
      Chunk(1, 1, 2, 2, 3, 3, 4, 4, 5, 5).uniq(Equivalence.number) == Chunk(1, 2, 3, 4, 5)
    )
    assert.isTrue(
      Chunk(1, 2, 3, 4, 5, 1, 2, 3, 4, 5).uniq(Equivalence.number) == Chunk(1, 2, 3, 4, 5)
    )
    assert.isTrue(Chunk("a", "b", "a").uniq(Equivalence.string) == Chunk("a", "b"))
    assert.isTrue(Chunk("a", "b", "A").uniq(Equivalence.string) == Chunk("a", "b", "A"))
  })

  it("zip", () => {
    const leftChunk = Chunk(0, 1, 2, 3)
    const rightChunk = Chunk(0, 1, 2, 3, 4)

    const resultA = leftChunk.zip(rightChunk).toImmutableArray
    const resultB = rightChunk.zip(leftChunk).toImmutableArray

    assert.isTrue(resultA == ImmutableArray([0, 0], [1, 1], [2, 2], [3, 3]))
    assert.isTrue(resultB == ImmutableArray([0, 0], [1, 1], [2, 2], [3, 3]))
  })

  it("zipAll", () => {
    const leftChunk = Chunk(0, 1, 2, 3)
    const rightChunk = Chunk(0, 1, 2, 3, 4)

    const resultA = leftChunk.zipAll(rightChunk).toImmutableArray
    const resultB = rightChunk.zipAll(leftChunk).toImmutableArray

    assert.isTrue(
      resultA == ImmutableArray(
        [Maybe.some(0), Maybe.some(0)],
        [Maybe.some(1), Maybe.some(1)],
        [Maybe.some(2), Maybe.some(2)],
        [Maybe.some(3), Maybe.some(3)],
        [Maybe.none, Maybe.some(4)]
      )
    )
    assert.isTrue(
      resultB == ImmutableArray(
        [Maybe.some(0), Maybe.some(0)],
        [Maybe.some(1), Maybe.some(1)],
        [Maybe.some(2), Maybe.some(2)],
        [Maybe.some(3), Maybe.some(3)],
        [Maybe.some(4), Maybe.none]
      )
    )
  })

  it("zipWithIndex", () => {
    const chunk = Chunk(1, 2, 3, 4)

    const result = chunk.zipWithIndex.toImmutableArray

    assert.isTrue(result == ImmutableArray([1, 0], [2, 1], [3, 2], [4, 3]))
  })
})
