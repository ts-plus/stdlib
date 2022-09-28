class Key implements Equals {
  constructor(readonly n: number) {}

  [Hash.sym](): number {
    return Hash.number(this.n)
  }

  [Equals.sym](u: unknown): boolean {
    return u instanceof Key && this.n === u.n
  }
}

class Value implements Equals {
  constructor(readonly s: string) {}

  [Hash.sym](): number {
    return Hash.string(this.s)
  }

  [Equals.sym](u: unknown): boolean {
    return u instanceof Value && this.s === u.s
  }
}

describe.concurrent("HashMap", () => {
  function key(n: number): Key {
    return new Key(n)
  }

  function value(s: string): Value {
    return new Value(s)
  }

  it("has", () => {
    const hashMap = HashMap([key(0), value("a")])

    assert.isTrue(hashMap.has(key(0)))
    assert.isFalse(hashMap.has(key(1)))
  })

  it("hasHash", () => {
    const hashMap = HashMap([key(0), value("a")])

    assert.isTrue(hashMap.hasHash(key(0), Hash.unknown(key(0))))
    assert.isFalse(hashMap.hasHash(key(1), Hash.unknown(key(0))))
  })

  it("get", () => {
    const hashMap = HashMap([key(0), value("a")])

    assert.isTrue(hashMap[key(0)] == Maybe.some(value("a")))
    assert.isTrue(hashMap[key(1)] == Maybe.none)
  })

  it("getHash", () => {
    const hashMap = HashMap([key(0), value("a")])

    assert.isTrue(hashMap.getHash(key(0), Hash.unknown(0)) == Maybe.some(value("a")))
    assert.isTrue(hashMap.getHash(key(1), Hash.unknown(0)) == Maybe.none)
  })

  it("set", () => {
    let hashMap = HashMap.empty<Key, Value>()

    hashMap = hashMap.set(key(0), value("a"))

    assert.isTrue(hashMap[key(0)] == Maybe.some(value("a")))
  })

  it("mutation", () => {
    let hashMap = HashMap.empty()

    assert.propertyVal(hashMap, "_editable", false)

    hashMap = hashMap.beginMutation

    assert.propertyVal(hashMap, "_editable", true)

    hashMap = hashMap.endMutation

    assert.propertyVal(hashMap, "_editable", false)
  })

  it("mutate", () => {
    const hashMap = HashMap.empty<number, string>()

    const result = hashMap.mutate((map) => {
      map.set(0, "a")
    })

    assert.isTrue(result[0] == Maybe.some("a"))
    assert.isTrue(result[1] == Maybe.none)
  })

  it("flatMap", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("bb")])

    const result = hashMap.flatMap(({ s }) => {
      const newKey = key(s.length)
      const newValue = value(s)
      return HashMap.empty<Key, Value>().set(newKey, newValue)
    })

    assert.isTrue(result[key(1)] == Maybe.some(value("a")))
    assert.isTrue(result[key(2)] == Maybe.some(value("bb")))
    assert.isTrue(result[key(3)] == Maybe.none)
  })

  it("chainWithIndex", () => {
    const hashMap = HashMap([key(1), value("a")], [key(2), value("bb")])

    const result = hashMap.flatMapWithIndex(({ n }, { s }) => {
      const newKey = key(s.length + n)
      const newValue = value(s)
      return HashMap.empty<Key, Value>().set(newKey, newValue)
    })

    assert.isTrue(result[key(2)] == Maybe.some(value("a")))
    assert.isTrue(result[key(4)] == Maybe.some(value("bb")))
    assert.isTrue(result[key(6)] == Maybe.none)
  })

  it("collect", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("bb")])

    const result = hashMap.collect(({ s }) => s.length > 1 ? Maybe.some(value(s)) : Maybe.none)

    assert.isTrue(result[key(0)] == Maybe.none)
    assert.isTrue(result[key(1)] == Maybe.some(value("bb")))
  })

  it("collectWithIndex", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("bb")])

    const result = hashMap.collectWithIndex(({ n }, v) => n > 0 ? Maybe.some(v) : Maybe.none)

    assert.isTrue(result[key(0)] == Maybe.none)
    assert.isTrue(result[key(1)] == Maybe.some(value("bb")))
  })

  it("compact", () => {
    const hashMap = HashMap([0, Maybe.some("a")], [1, Maybe.none])

    const result = hashMap.compact

    assert.strictEqual(result.unsafeGet(0), "a")
    assert.throws(() => result.unsafeGet(1))
  })

  it("filter", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("bb")])

    const result = hashMap.filter(({ s }) => s.length > 1)

    assert.isTrue(result[key(0)] == Maybe.none)
    assert.isTrue(result[key(1)] == Maybe.some(value("bb")))
  })

  it("filterWithIndex", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("bb")])

    const result = hashMap.filterWithIndex(({ n }, { s }) => n > 0 && s.length > 0)

    assert.isTrue(result[key(0)] == Maybe.none)
    assert.isTrue(result[key(1)] == Maybe.some(value("bb")))
  })

  it("forEach", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("b")])
    const result: Array<string> = []

    hashMap.forEach((v) => {
      result.push(v.s)
    })

    assert.deepEqual(result, ["a", "b"])
  })

  it("forEachWithIndex", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("b")])
    const result: Array<[number, string]> = []

    hashMap.forEachWithIndex(({ n }, { s }) => {
      result.push([n, s])
    })

    assert.deepEqual(result, [[0, "a"], [1, "b"]])
  })

  it("isEmpty", () => {
    assert.isTrue(HashMap().isEmpty)
    assert.isFalse(HashMap([key(0), value("a")]).isEmpty)
  })

  it("keys", () => {
    const hashMap = HashMap([0, "a"], [1, "b"])

    const result = hashMap.keys

    assert.deepEqual([...result], [0, 1])
  })

  it("keySet", () => {
    const hashMap = HashMap(
      [key(0), value("a")],
      [key(1), value("b")],
      [key(1), value("c")]
    )

    const result = hashMap.keySet

    assert.deepEqual([...result], [key(0), key(1)])
  })

  it("map", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("bb")])

    const result = hashMap.map(({ s }) => s.length)

    assert.isTrue(result[key(0)] == Maybe.some(1))
    assert.isTrue(result[key(1)] == Maybe.some(2))
    assert.isTrue(result[key(2)] == Maybe.none)
  })

  it("mapWithIndex", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("bb")])

    const result = hashMap.mapWithIndex(({ n }, { s }) => n + s.length)

    assert.isTrue(result[key(0)] == Maybe.some(1))
    assert.isTrue(result[key(1)] == Maybe.some(3))
    assert.isTrue(result[key(2)] == Maybe.none)
  })

  it("modify", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("b")])

    const result = hashMap.modify(
      key(0),
      (maybe) => maybe.isSome() ? Maybe.some(value("test")) : Maybe.none
    )

    assert.isTrue(result[key(0)] == Maybe.some(value("test")))
    assert.isTrue(result[key(1)] == Maybe.some(value("b")))
    assert.isTrue(result[key(2)] == Maybe.none)
  })

  it("modifyHash", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("b")])

    const result = hashMap.modifyHash(
      key(0),
      Hash.unknown(key(0)),
      (maybe) => maybe.isSome() ? Maybe.some(value("test")) : Maybe.none
    )

    assert.isTrue(result[key(0)] == Maybe.some(value("test")))
    assert.isTrue(result[key(1)] == Maybe.some(value("b")))
    assert.isTrue(result[key(2)] == Maybe.none)
  })

  it("reduce", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("b")])

    const result = hashMap.reduce("", (acc, { s }) => acc.length > 0 ? `${acc},${s}` : s)

    assert.strictEqual(result, "a,b")
  })

  it("reduceWithIndex", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("b")])

    const result = hashMap.reduceWithIndex(
      "",
      (acc, { n }, { s }) => acc.length > 0 ? `${acc},${n}:${s}` : `${n}:${s}`
    )

    assert.strictEqual(result, "0:a,1:b")
  })

  it("remove", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("b")])

    const result = hashMap.remove(key(0))

    assert.isTrue(result[key(0)] == Maybe.none)
    assert.isTrue(result[key(1)] == Maybe.some(value("b")))
  })

  it("remove non existing key doesn't change the array", () => {
    const map = HashMap([13, 95], [90, 4])
    assert.deepEqual(map.remove(75).keySet.toArray, map.keySet.toArray)
  })

  it("removeMany", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("b")])

    assert.isFalse(hashMap.isEmpty)

    const result = hashMap.removeMany([key(0), key(1)])

    assert.isTrue(result.isEmpty)
  })

  it("size", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("b")])

    const result = hashMap.size

    assert.strictEqual(result, 2)
  })

  it("union", () => {
    const map1 = HashMap([0, "a"], [1, "b"])
    const map2 = HashMap(["foo", true], ["bar", false])

    const result = map1 + map2

    assert.isTrue(result[0] == Maybe.some("a"))
    assert.isTrue(result[1] == Maybe.some("b"))
    assert.isTrue(result["foo"] == Maybe.some(true))
    assert.isTrue(result["bar"] == Maybe.some(false))
  })

  it("update", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("b")])

    const result = hashMap.update(key(0), ({ s }) => value(`${s}-${s}`))

    assert.isTrue(result[key(0)] == Maybe.some(value("a-a")))
    assert.isTrue(result[key(1)] == Maybe.some(value("b")))
    assert.isTrue(result[key(2)] == Maybe.none)
  })

  it("values", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("b")])

    const result = hashMap.values

    assert.deepEqual([...result], [value("a"), value("b")])
  })

  it("equals", () => {
    const a = HashMap([key(0), value("a")], [key(1), value("b")])
    const b = HashMap([key(0), value("a")], [key(1), value("b")])

    assert.isTrue(a == b)
  })

  it("getAssociative", () => {
    const a = HashMap([key(0), value("a")], [key(1), value("b")])
    const b = HashMap([key(0), value("a")], [key(1), value("b")])
    const expected = HashMap([key(0), value("aa")], [key(1), value("bb")])
    const A = HashMap.getAssociative<Key, Value>(
      Associative((x: Value, y: Value) => value(Associative.string.combine(x.s, y.s)))
    )
    assert.isTrue(
      A.combine(a, b).equals(expected)
    )
  })
})
