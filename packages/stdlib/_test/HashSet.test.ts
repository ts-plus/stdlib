class Value implements Equals {
  constructor(readonly n: number) {}

  [Hash.sym](): number {
    return Hash.number(this.n)
  }

  [Equals.sym](u: unknown): boolean {
    return u instanceof Value && this.n === u.n
  }
}

describe.concurrent("HashSet", () => {
  function value(n: number): Value {
    return new Value(n)
  }

  function makeTestHashSet(...values: Array<number>): HashSet<Value> {
    const hashSet = HashSet.empty<Value>()
    return hashSet.mutate((set) => {
      for (const v of values) {
        set.add(value(v))
      }
    })
  }

  it("add", () => {
    const hashSet = makeTestHashSet(0, 1, 2)

    assert.isTrue(hashSet == HashSet(value(0), value(1), value(2)))
  })

  it("mutation", () => {
    let hashSet = HashSet.empty<number>()

    assert.nestedPropertyVal(hashSet, "_keyMap._editable", false)

    hashSet = hashSet.beginMutation

    assert.nestedPropertyVal(hashSet, "_keyMap._editable", true)

    hashSet = hashSet.endMutation

    assert.nestedPropertyVal(hashSet, "_keyMap._editable", false)
  })

  it("flatMap", () => {
    const hashSet = makeTestHashSet(0, 1, 2)

    const result = hashSet.flatMap((v) => [`${v.n}`])

    assert.isTrue(result == HashSet("0", "1", "2"))
  })

  it("difference", () => {
    const set1 = makeTestHashSet(0, 1, 2)
    const set2 = makeTestHashSet(2, 3, 4)

    const result = set1.difference(set2)

    assert.isTrue(result == HashSet(value(0), value(1)))
  })

  it("every", () => {
    const hashSet = makeTestHashSet(0, 1, 2)

    assert.isTrue(hashSet.every(({ n }) => n >= 0))
    assert.isFalse(hashSet.every(({ n }) => n > 0))
  })

  it("filter", () => {
    const hashSet = makeTestHashSet(0, 1, 2)

    const result = hashSet.filter(({ n }) => n > 0)

    assert.isTrue(result == HashSet(value(1), value(2)))
  })

  it("forEach", () => {
    const hashSet = makeTestHashSet(0, 1, 2)
    const result: Array<number> = []

    hashSet.forEach(({ n }) => {
      result.push(n)
    })

    assert.isTrue(result == HashSet(0, 1, 2))
  })

  it("has", () => {
    const hashSet = makeTestHashSet(0, 1, 2)

    assert.isTrue(hashSet.has(value(0)))
    assert.isTrue(hashSet.has(value(1)))
    assert.isTrue(hashSet.has(value(2)))
    assert.isFalse(hashSet.has(value(3)))
  })

  it("intersection", () => {
    const set1 = makeTestHashSet(0, 1, 2)
    const set2 = makeTestHashSet(2, 3, 4)

    const result = set1.intersection(set2)

    assert.isTrue(result == HashSet(value(2)))
  })

  it("isSubset", () => {
    const set1 = makeTestHashSet(0, 1)
    const set2 = makeTestHashSet(1, 2)
    const set3 = makeTestHashSet(0, 1, 2)

    assert.isFalse(set1.isSubset(set2))
    assert.isTrue(set1.isSubset(set3))
  })

  it("map", () => {
    const hashSet = makeTestHashSet(0, 1, 2)

    const result = hashSet.map(({ n }) => value(n + 1))

    assert.isTrue(result == HashSet(value(1), value(2), value(3)))
  })

  it("mutate", () => {
    const hashSet = makeTestHashSet(0, 1, 2)

    const result = hashSet.mutate((set) => {
      set.add(value(3))
      set.remove(value(0))
    })

    assert.isFalse(result.has(value(0)))
    assert.isTrue(result.has(value(1)))
    assert.isTrue(result.has(value(2)))
    assert.isTrue(result.has(value(3)))
  })

  it("partition", () => {
    const hashSet = makeTestHashSet(0, 1, 2, 3, 4, 5)

    const result = hashSet.partition(({ n }) => n > 2)

    assert.isTrue(result[0] == HashSet(value(0), value(1), value(2)))
    assert.isTrue(result[1] == HashSet(value(3), value(4), value(5)))
  })

  it("remove", () => {
    const hashSet = makeTestHashSet(0, 1, 2)

    const result = hashSet.remove(value(0))

    assert.isFalse(result.has(value(0)))
    assert.isTrue(result.has(value(1)))
    assert.isTrue(result.has(value(2)))
  })

  it("size", () => {
    const hashSet = makeTestHashSet(0, 1, 2)

    const result = hashSet.size

    assert.strictEqual(result, 3)
  })

  it("some", () => {
    const hashSet = makeTestHashSet(0, 1, 2)

    assert.isTrue(hashSet.some(({ n }) => n > 0))
    assert.isFalse(hashSet.some(({ n }) => n > 2))
  })

  it("toggle", () => {
    let hashSet = makeTestHashSet(0, 1, 2)

    assert.isTrue(hashSet.has(value(0)))

    hashSet = hashSet.toggle(value(0))

    assert.isFalse(hashSet.has(value(0)))

    hashSet = hashSet.toggle(value(0))

    assert.isTrue(hashSet.has(value(0)))
  })

  it("union", () => {
    const set1 = makeTestHashSet(0, 1, 2)
    const set2 = makeTestHashSet(2, 3, 4)

    const result = set1.union(set2)

    assert.isTrue(result == HashSet(value(0), value(1), value(2), value(3), value(4)))
  })

  it("values", () => {
    const hashSet = makeTestHashSet(0, 1, 2)

    const result = hashSet.values

    assert.isTrue(result == HashSet(value(0), value(1), value(2)))
  })

  it("toCollection", () => {
    const hashSet = makeTestHashSet(1, 2, 3)

    const result = hashSet.toCollection

    assert.deepEqual([...result], [value(1), value(2), value(3)])
  })
})
