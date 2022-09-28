describe.concurrent("ImmutableQueue", () => {
  it("append", () => {
    const queue = ImmutableQueue.empty<number>()

    const result = queue.append(1).append(2).append(3)

    assert.isTrue(result.toImmutableArray == ImmutableArray(1, 2, 3))
  })

  it("appendAll", () => {
    const queue = ImmutableQueue.empty<number>()

    const result = queue.appendAll(Collection(1, 2, 3))

    assert.isTrue(result.toImmutableArray == ImmutableArray(1, 2, 3))
  })

  it("dequeue", () => {
    const queue = ImmutableQueue(1, 2)

    const result1 = queue.dequeue
    const result2 = result1.value![1].dequeue
    const result3 = result2.value![1].dequeue

    assert.isTrue(result1 == Maybe.some([1, ImmutableQueue(2)]))
    assert.isTrue(result2 == Maybe.some([2, ImmutableQueue.empty<number>()]))
    assert.isTrue(result3 == Maybe.none)
  })

  it("head", () => {
    const queue = ImmutableQueue(1, 2, 3, 4, 5)

    assert.isTrue(queue.head == Maybe.some(1))
  })

  it("find", () => {
    const queue = ImmutableQueue(1, 2, 3)

    assert.isTrue(queue.find((n) => n % 2 === 0) == Maybe.some(2))
    assert.isTrue(queue.find((n) => n % 5 === 0) == Maybe.none)
  })

  it("filter", () => {
    const queue = ImmutableQueue(0, 1, 2, 3, 4, 5)

    assert.isTrue(queue.filter((n) => n % 2 === 0) == ImmutableQueue(0, 2, 4))
  })

  it("splitAt", () => {
    const queue = ImmutableQueue(0, 1, 2, 3, 4, 5)

    const [left, right] = queue.splitAt(3)

    assert.isTrue(left == ImmutableQueue(0, 1, 2))
    assert.isTrue(right == ImmutableQueue(3, 4, 5))
  })

  it("splitAt - empty leftover", () => {
    const queue = ImmutableQueue(0, 1, 2, 3, 4, 5)

    const [left, right] = queue.splitAt(6)

    assert.isTrue(left == ImmutableQueue(0, 1, 2, 3, 4, 5))
    assert.isTrue(right == ImmutableQueue())
  })

  it("drop", () => {
    const queue = ImmutableQueue(1, 2, 3, 4, 5, 6)

    const result = queue.drop(5)

    assert.isTrue(result == ImmutableQueue(6))
  })

  it("prepend", () => {
    const queue = ImmutableQueue.empty<number>()

    const result = queue.append(1).prepend(2).append(3)

    assert.isTrue(result.toImmutableArray == ImmutableArray(2, 1, 3))
  })

  it("size", () => {
    const queue1 = ImmutableQueue.empty<number>()

    assert.strictEqual(queue1.size, 0)

    const queue2 = ImmutableQueue(1, 2, 3, 4, 5)

    assert.strictEqual(queue2.size, 5)
  })
})
