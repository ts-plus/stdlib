class Key implements Equals {
  constructor(readonly id: number) {}

  [Hash.sym](): number {
    return Hash.number(this.id)
  }

  [Equals.sym](u: unknown): boolean {
    return u instanceof Key && this.id === u.id
  }
}

class Value implements Equals {
  constructor(readonly id: number) {}

  [Hash.sym](): number {
    return Hash.number(this.id)
  }

  [Equals.sym](u: unknown): boolean {
    return u instanceof Value && this.id === u.id
  }
}

function key(n: number): Key {
  return new Key(n)
}

function value(n: number): Value {
  return new Value(n)
}

function makeSortedMap(...numbers: Array<readonly [number, number]>): SortedMap<Key, Value> {
  const entries = numbers.map(([k, v]) => [key(k), value(v)] as const)
  return SortedMap.from(Ord.number.contramap((key: Key) => key.id))(entries)
}

describe.concurrent("SortedMap", () => {
  it("entries", () => {
    const map = makeSortedMap([0, 10], [1, 20], [2, 30])

    const result = ImmutableArray.from(map)

    assert.isTrue(
      result == ImmutableArray(
        [key(0), value(10)],
        [key(1), value(20)],
        [key(2), value(30)]
      )
    )
  })

  it("get", () => {
    const map = makeSortedMap([0, 10], [1, 20], [2, 30])

    assert.isTrue(map.get(key(0)) == Maybe.some(value(10)))
    assert.isTrue(map.get(key(4)) == Maybe.none)
  })

  it("has", () => {
    const map = makeSortedMap([0, 10], [1, 20], [2, 30])

    assert.isTrue(map.has(key(0)))
    assert.isFalse(map.has(key(4)))
  })

  it("headOption", () => {
    const map1 = makeSortedMap([0, 10], [1, 20], [2, 30])
    const map2 = SortedMap.empty<number, number>(Ord.number)

    assert.isTrue(map1.headMaybe == Maybe.some([key(0), value(10)]))
    assert.isTrue(map2.headMaybe == Maybe.none)
  })

  it("isEmpty", () => {
    const map1 = makeSortedMap([0, 10], [1, 20], [2, 30])
    const map2 = SortedMap.empty<number, number>(Ord.number)

    assert.isFalse(map1.isEmpty)
    assert.isTrue(map2.isEmpty)
  })

  it("isNonEmpty", () => {
    const map1 = makeSortedMap([0, 10], [1, 20], [2, 30])
    const map2 = SortedMap.empty<number, number>(Ord.number)

    assert.isTrue(map1.isNonEmpty)
    assert.isFalse(map2.isNonEmpty)
  })

  it("keys", () => {
    const map = makeSortedMap([0, 10], [1, 20], [2, 30])

    const result = ImmutableArray.from(map.keys)

    assert.isTrue(result == ImmutableArray(key(0), key(1), key(2)))
  })

  it("map", () => {
    const map = makeSortedMap([0, 10], [1, 20], [2, 30])

    const result = ImmutableArray.from(map.map((value) => value.id))

    assert.isTrue(
      result == ImmutableArray(
        [key(0), 10],
        [key(1), 20],
        [key(2), 30]
      )
    )
  })

  it("mapWithIndex", () => {
    const map = makeSortedMap([0, 10], [1, 20], [2, 30])

    const result = ImmutableArray.from(map.mapWithIndex((key, value) => key.id + value.id))

    assert.isTrue(
      result == ImmutableArray(
        [key(0), 10],
        [key(1), 21],
        [key(2), 32]
      )
    )
  })

  it("reduce", () => {
    const map = makeSortedMap([0, 10], [1, 20], [2, 30])

    const result = map.reduce("", (acc, value) => acc + value.id)

    assert.strictEqual(result, "102030")
  })

  it("reduceWithIndex", () => {
    const map = makeSortedMap([0, 10], [1, 20], [2, 30])

    const result = map.reduceWithIndex("", (acc, key, value) => acc + key.id + value.id)

    assert.strictEqual(result, "010120230")
  })

  it("remove", () => {
    const map = makeSortedMap([0, 10], [1, 20], [2, 30])

    assert.isTrue(map.has(key(0)))

    const result1 = map.remove(key(0))

    assert.isFalse(result1.has(key(0)))
  })

  it("set", () => {
    const map = makeSortedMap([0, 10], [1, 20], [2, 30])

    assert.isFalse(map.has(key(4)))

    const result1 = map.set(key(4), value(40))

    assert.isTrue(result1.has(key(4)))
  })

  it("size", () => {
    const map = makeSortedMap([0, 10], [1, 20], [2, 30])

    assert.strictEqual(map.size, 3)
  })

  it("values", () => {
    const map = makeSortedMap([0, 10], [1, 20], [2, 30])

    const result = ImmutableArray.from(map.values)

    assert.isTrue(result == ImmutableArray(value(10), value(20), value(30)))
  })
})
