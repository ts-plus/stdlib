class Key implements Equals {
  constructor(readonly a: number, readonly b: number) {}

  [Hash.sym]() {
    return Hash.string(`${this.a}-${this.b}`)
  }

  [Equals.sym](that: unknown): boolean {
    return that instanceof Key && this.a === that.a && this.b === that.b
  }
}

class Value implements Equals {
  constructor(readonly c: number, readonly d: number) {}

  [Hash.sym]() {
    return Hash.string(`${this.c}-${this.d}`)
  }

  [Equals.sym](that: unknown): boolean {
    return that instanceof Value && this.c === that.c && this.d === that.d
  }
}

function key(a: number, b: number): Key {
  return new Key(a, b)
}

function value(c: number, d: number): Value {
  return new Value(c, d)
}

describe.concurrent("MutableHashMap", () => {
  it("from", () => {
    const map = MutableHashMap([key(0, 0), value(0, 0)], [key(1, 1), value(1, 1)])

    assert.strictEqual(map.size, 2)
    assert.isTrue(map.has(key(0, 0)))
    assert.isTrue(map.has(key(1, 1)))
  })

  it("get", () => {
    const map = MutableHashMap.empty<Key, Value>()
      .set(key(0, 0), value(0, 0))
      .set(key(0, 0), value(1, 1))

    const result = map.get(key(0, 0))

    assert.isTrue(result == Maybe.some(value(1, 1)))
  })

  it("has", () => {
    const map = MutableHashMap.empty<Key, Value>()
      .set(key(0, 0), value(0, 0))
      .set(key(0, 0), value(1, 1))
      .set(key(1, 1), value(2, 2))
      .set(key(1, 1), value(3, 3))
      .set(key(0, 0), value(4, 4))

    assert.isTrue(map.has(key(0, 0)))
    assert.isTrue(map.has(key(1, 1)))
    assert.isFalse(map.has(key(4, 4)))
  })

  it("modify", () => {
    const map = MutableHashMap.empty<Key, Value>()
      .set(key(0, 0), value(0, 0))
      .set(key(1, 1), value(1, 1))

    map.modify(key(0, 0), () => Maybe.some(value(0, 1)))

    assert.strictEqual(map.size, 2)
    assert.isTrue(map.get(key(0, 0)) == Maybe.some(value(0, 1)))

    map.modify(key(2, 2), (maybe) => maybe.fold(Maybe.some(value(2, 2)), Maybe.some))

    assert.strictEqual(map.size, 3)
    assert.isTrue(map.get(key(2, 2)) == Maybe.some(value(2, 2)))
  })

  it("remove", () => {
    const map = MutableHashMap.empty<Key, Value>()
      .set(key(0, 0), value(0, 0))
      .set(key(1, 1), value(1, 1))

    assert.strictEqual(map.size, 2)
    assert.isTrue(map.has(key(1, 1)))

    map.remove(key(1, 1))

    assert.strictEqual(map.size, 1)
    assert.isFalse(map.has(key(1, 1)))
  })

  it("set", () => {
    const map = MutableHashMap.empty<Key, Value>()
      .set(key(0, 0), value(0, 0))
      .set(key(0, 0), value(1, 1))
      .set(key(1, 1), value(2, 2))
      .set(key(1, 1), value(3, 3))
      .set(key(0, 0), value(4, 4))

    assert.isTrue(
      map.toImmutableArray == ImmutableArray(
        [key(0, 0), value(4, 4)],
        [key(1, 1), value(3, 3)]
      )
    )
  })

  it("size", () => {
    const map = HashMap.empty<Key, Value>()
      .set(key(0, 0), value(0, 0))
      .set(key(0, 0), value(1, 1))
      .set(key(1, 1), value(2, 2))
      .set(key(1, 1), value(3, 3))
      .set(key(0, 0), value(4, 4))

    assert.strictEqual(map.size, 2)
  })

  it("update", () => {
    const map = MutableHashMap.empty<Key, Value>()
      .set(key(0, 0), value(0, 0))
      .set(key(1, 1), value(1, 1))

    map.update(key(0, 0), (v) => value(v.c + 1, v.d + 1))

    assert.isTrue(map.get(key(0, 0)) == Maybe.some(value(1, 1)))
  })
})
