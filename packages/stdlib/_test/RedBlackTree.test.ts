describe.concurrent("RedBlackTree", () => {
  it("forEach", () => {
    const ordered: [number, string][] = []

    RedBlackTree.empty<number, string>(Ord.number)
      .insert(1, "a")
      .insert(0, "b")
      .insert(-1, "c")
      .insert(-2, "d")
      .insert(3, "e")
      .forEach((n, s) => {
        ordered.push([n, s])
      })

    assert.deepEqual(ordered, [
      [-2, "d"],
      [-1, "c"],
      [0, "b"],
      [1, "a"],
      [3, "e"]
    ])
  })

  it("iterable", () => {
    const tree = RedBlackTree.empty<number, string>(Ord.number)
      .insert(1, "a")
      .insert(0, "b")
      .insert(-1, "c")
      .insert(-2, "d")
      .insert(3, "e")

    assert.strictEqual(tree.size, 5)
    assert.deepEqual(Array.from(tree), [
      [-2, "d"],
      [-1, "c"],
      [0, "b"],
      [1, "a"],
      [3, "e"]
    ])
  })

  it("iterable empty", () => {
    const tree = RedBlackTree.empty<number, string>(Ord.number)

    assert.strictEqual(tree.size, 0)
    assert.isTrue(tree.toImmutableArray == ImmutableArray.empty())
  })

  it("backwards", () => {
    const tree = RedBlackTree.empty<number, string>(Ord.number)
      .insert(1, "a")
      .insert(0, "b")
      .insert(-1, "c")
      .insert(-2, "d")
      .insert(3, "e")

    assert.strictEqual(tree.size, 5)
    assert.deepEqual(Array.from(tree.backwards), [
      [3, "e"],
      [1, "a"],
      [0, "b"],
      [-1, "c"],
      [-2, "d"]
    ])
  })

  it("backwards empty", () => {
    const tree = RedBlackTree.empty<number, string>(Ord.number)

    assert.strictEqual(tree.size, 0)
    assert.isTrue(tree.backwards.toImmutableArray == ImmutableArray.empty())
  })

  it("values", () => {
    const tree = RedBlackTree.empty<number, string>(Ord.number)
      .insert(1, "a")
      .insert(0, "b")
      .insert(-1, "c")
      .insert(-2, "d")
      .insert(3, "e")

    assert.strictEqual(tree.size, 5)
    assert.deepEqual(Array.from(tree.values()), ["d", "c", "b", "a", "e"])
  })

  it("keys", () => {
    const tree = RedBlackTree.empty<number, string>(Ord.number)
      .insert(1, "a")
      .insert(0, "b")
      .insert(-1, "c")
      .insert(-2, "d")
      .insert(3, "e")

    assert.strictEqual(tree.size, 5)
    assert.deepEqual(Array.from(tree.keys()), [-2, -1, 0, 1, 3])
  })

  it("begin/end", () => {
    const tree = RedBlackTree.empty<number, string>(Ord.number)
      .insert(1, "a")
      .insert(0, "b")
      .insert(-1, "c")
      .insert(-2, "d")
      .insert(3, "e")

    assert.isTrue(tree.first == Maybe.some([-2, "d"]))
    assert.isTrue(tree.last == Maybe.some([3, "e"]))
    assert.isTrue(tree.getAt(1) == Maybe.some([-1, "c"]))
  })

  it("forEachGe", () => {
    const ordered: [number, string][] = []

    RedBlackTree.empty<number, string>(Ord.number)
      .insert(1, "a")
      .insert(0, "b")
      .insert(-1, "c")
      .insert(-2, "d")
      .insert(3, "e")
      .forEachGe(0, (k, v) => {
        ordered.push([k, v])
      })

    assert.deepEqual(ordered, [[0, "b"], [1, "a"], [3, "e"]])
  })

  it("forEachLt", () => {
    const ordered: [number, string][] = []

    RedBlackTree.empty<number, string>(Ord.number)
      .insert(1, "a")
      .insert(0, "b")
      .insert(-1, "c")
      .insert(-2, "d")
      .insert(3, "e")
      .forEachLt(0, (k, v) => {
        ordered.push([k, v])
      })

    assert.deepEqual(ordered, [[-2, "d"], [-1, "c"]])
  })

  it("forEachBetween", () => {
    const ordered: [number, string][] = []

    RedBlackTree.empty<number, string>(Ord.number)
      .insert(1, "a")
      .insert(0, "b")
      .insert(-1, "c")
      .insert(-2, "d")
      .insert(3, "e")
      .forEachBetween(-1, 2, (k, v) => {
        ordered.push([k, v])
      })

    assert.deepEqual(ordered, [[-1, "c"], [0, "b"], [1, "a"]])
  })

  it("ge", () => {
    const tree = RedBlackTree.empty<number, string>(Ord.number)
      .insert(1, "a")
      .insert(0, "b")
      .insert(-1, "c")
      .insert(-2, "d")
      .insert(3, "e")

    assert.deepEqual(Array.from(tree.ge(0)), [[0, "b"], [1, "a"], [3, "e"]])
    assert.deepEqual(Array.from(tree.ge(0, "Backward")), [
      [0, "b"],
      [-1, "c"],
      [-2, "d"]
    ])
  })

  it("find", () => {
    const tree = RedBlackTree.empty<number, string>(Ord.number)
      .insert(1, "a")
      .insert(2, "c")
      .insert(1, "b")
      .insert(3, "d")
      .insert(1, "e")

    assert.isTrue(tree.find(1) == ImmutableArray("e", "b", "a"))
  })

  it("find Eq/Ord", () => {
    class Key {
      constructor(readonly n: number, readonly s: string) {}

      [Hash.sym](): number {
        return Hash.combine(Hash.number(this.n), Hash.string(this.s))
      }

      [Equals.sym](that: unknown): boolean {
        return that instanceof Key && this.n === that.n && this.s === that.s
      }
    }

    const tree = RedBlackTree.empty<Key, string>(Ord.number.contramap((_) => _.n))
      .insert(new Key(1, "0"), "a")
      .insert(new Key(2, "0"), "c")
      .insert(new Key(1, "1"), "b")
      .insert(new Key(3, "0"), "d")
      .insert(new Key(1, "0"), "e")
      .insert(new Key(1, "0"), "f")
      .insert(new Key(1, "1"), "g")

    assert.deepEqual(Array.from(tree.values()), ["g", "f", "e", "b", "a", "c", "d"])
    assert.isTrue(tree.find(new Key(1, "0")) == ImmutableArray("f", "e", "a"))
    assert.deepEqual(Array.from(tree.removeFirst(new Key(1, "1")).values()), [
      "f",
      "e",
      "b",
      "a",
      "c",
      "d"
    ])
    assert.deepEqual(Array.from(tree.removeFirst(new Key(1, "0")).values()), [
      "g",
      "f",
      "e",
      "b",
      "c",
      "d"
    ])
  })
})
