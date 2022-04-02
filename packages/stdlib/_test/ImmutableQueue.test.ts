describe("ImmutableQueue", () => {
  it("append", () => {
    const queue = ImmutableQueue.empty<number>();

    const result = queue.append(1).append(2).append(3);

    assert.isTrue(result.asImmutableArray() == ImmutableArray(1, 2, 3));
  });

  it("dequeue", () => {
    const queue = ImmutableQueue(1, 2);

    const result1 = queue.dequeue();
    const result2 = result1.value!.get(1).dequeue();
    const result3 = result2.value!.get(1).dequeue();

    assert.isTrue(result1 == Option.some(Tuple(1, ImmutableQueue(2))));
    assert.isTrue(result2 == Option.some(Tuple(2, ImmutableQueue.empty<number>())));
    assert.isTrue(result3 == Option.none);
  });

  it("find", () => {
    const queue = ImmutableQueue(1, 2, 3);

    assert.isTrue(queue.find((n) => n % 2 === 0) == Option.some(2));
    assert.isTrue(queue.find((n) => n % 5 === 0) == Option.none);
  });

  it("filter", () => {
    const queue = ImmutableQueue(0, 1, 2, 3, 4, 5);

    assert.isTrue(queue.filter((n) => n % 2 === 0) == ImmutableQueue(0, 2, 4));
  });

  it("prepend", () => {
    const queue = ImmutableQueue.empty<number>();

    const result = queue.append(1).prepend(2).append(3);

    assert.isTrue(result.asImmutableArray() == ImmutableArray(2, 1, 3));
  });

  it("size", () => {
    const queue1 = ImmutableQueue.empty<number>();

    assert.strictEqual(queue1.size, 0);

    const queue2 = ImmutableQueue(1, 2, 3, 4, 5);

    assert.strictEqual(queue2.size, 5);
  });
});
