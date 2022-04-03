describe.concurrent("Chunk", () => {
  it("find & concat", () => {
    const chunk = Chunk(4, 5, 6) + Chunk(1, 2, 3);
    const result = chunk.find((v) => v === 3);

    assert.isTrue(result == Option.some(3));
  });

  it("spread", () => {
    const f = (...args: number[]) => args;

    assert.deepEqual(f(...Chunk(0, 1, 2)), [0, 1, 2]);
  });

  it("append", () => {
    const chunkA = Chunk.single(1).append(2).append(3).append(4).append(5);
    const chunkB = Chunk(1, 2, 3, 4, 5);

    assert.isTrue(chunkA == chunkB);
  });

  it("prepend", () => {
    const chunkA = Chunk.single(1).prepend(2).prepend(3).prepend(4).prepend(5);
    const chunkB = Chunk(5, 4, 3, 2, 1);

    assert.isTrue(chunkA == chunkB);
  });

  it("fromArray", () => {
    const chunkA = Chunk.from([1, 2, 3, 4, 5]).append(6).append(7);
    const chunkB = Chunk(1, 2, 3, 4, 5, 6, 7);

    assert.isTrue(chunkA == chunkB);
  });

  it("concat", () => {
    const chunkA = Chunk(1, 2, 3, 4, 5) + Chunk(6, 7, 8, 9, 10);
    const chunkB = Chunk(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    assert.isTrue(chunkA == chunkB);
  });

  it("iterable", () => {
    const chunk = Chunk(0, 1, 2).asArrayLike();

    assert.deepEqual(chunk, Buffer.of(0, 1, 2));
  });

  it("get", () => {
    const chunk = Chunk(1, 2, 3, 4, 5);

    assert.isTrue(chunk.get(3) == Option.some(4));
    assert.isTrue(chunk.get(5) == Option.none);
  });

  it("buffer", () => {
    const chunk = Chunk.from(Buffer.from("hello")) +
      Chunk.from(Buffer.from(" ")) +
      Chunk.from(Buffer.from("world"));

    const result = chunk.drop(6).append(32).prepend(32).asArrayLike();

    assert.deepEqual(result, Buffer.from(" world "));
  });

  it("stack", () => {
    let a = Chunk.empty<number>();
    for (let i = 0; i < 100_000; i++) {
      a = a + Chunk(i, i);
    }

    const result = a.asArrayLike();

    assert.strictEqual(result.length, 200_000);
  });

  it("take", () => {
    const chunk = Chunk(1, 2, 3, 4, 5) + Chunk(6, 7, 8, 9, 10);

    const result = chunk.take(5).asImmutableArray();

    assert.isTrue(result == ImmutableArray(1, 2, 3, 4, 5));
  });

  it("takeRight", () => {
    const chunk = Chunk(1, 2, 3, 4, 5) + Chunk(6, 7, 8, 9, 10);

    const result = chunk.takeRight(5).asImmutableArray();

    assert.isTrue(result == ImmutableArray(6, 7, 8, 9, 10));
  });

  it("drop", () => {
    const chunk = Chunk(1, 2, 3, 4, 5) + Chunk(6, 7, 8, 9, 10);

    const result = chunk.drop(5).asImmutableArray();

    assert.isTrue(result == ImmutableArray(6, 7, 8, 9, 10));
  });

  it("map", () => {
    const chunk = Chunk.from(Buffer.from("hello-world"));

    const result = chunk.map((n) => (n === 45 ? 32 : n)).asArrayLike();

    assert.deepEqual(result, Buffer.from("hello world"));
  });

  it("flatMap", () => {
    const chunk = Chunk.from(Buffer.from("hello-world"));

    const result = chunk
      .flatMap((n) => (n === 45 ? Chunk.from(Buffer.from("-|-")) : Chunk.single(n)))
      .asArrayLike();

    assert.deepEqual(result, Buffer.from("hello-|-world"));
  });

  it("arrayLikeIterator", () => {
    const chunk = Chunk.single(0) + Chunk.single(1) + Chunk.single(2) + Chunk.single(3);

    const result = Array.from(chunk.buckets);

    assert.deepEqual(result, [Buffer.of(0), Buffer.of(1), Buffer.of(2), Buffer.of(3)]);
  });

  it("equals", () => {
    const chunkA = Chunk.single(0) +
      Chunk.single(1) +
      Chunk.single(2) +
      Chunk.single(3) +
      Chunk.single(4);
    const chunkB = Chunk.single(0).append(1).append(2).append(3).append(4);

    assert.isTrue(chunkA == chunkB);
  });

  it("dropWhile", () => {
    const chunk = Chunk(0, 1, 2, 3, 4);

    const result = chunk.dropWhile((n) => n < 2).asImmutableArray();

    assert.isTrue(result == ImmutableArray(2, 3, 4));
  });

  it("filter", () => {
    const chunk = Chunk(0, 1, 2, 3, 4);

    const result = chunk.filter((n) => n >= 2).asImmutableArray();

    assert.isTrue(result == ImmutableArray(2, 3, 4));
  });

  it("exists", () => {
    const chunk = Chunk(0, 1, 2, 3, 4);

    assert.isTrue(chunk.exists((n) => n === 3));
    assert.isFalse(chunk.exists((n) => n === 6));
  });

  it("find", () => {
    const chunk = Chunk(0, 1, 2, 3, 4);

    assert.isTrue(chunk.find((n) => n > 2) == Option.some(3));
    assert.isTrue(chunk.find((n) => n === 6) == Option.none);
  });

  it("indexWhere", () => {
    const chunk = Chunk(0, 1, 2, 1, 3, 4);

    const result = chunk.indexWhere((n) => n > 2);

    assert.strictEqual(result, 4);
  });

  it("indexWhereFrom", () => {
    const chunk = Chunk(0, 1, 2, 1, 3, 4);

    const result = chunk.indexWhereFrom(2, (n) => n > 2);

    assert.strictEqual(result, 4);
  });

  it("split", () => {
    function flattenArray(
      chunk: Chunk<Chunk<number>>
    ): ImmutableArray<ImmutableArray<number>> {
      return chunk.map((_) => _.asImmutableArray()).asImmutableArray();
    }

    const chunk = Chunk(0, 1, 2, 3, 4, 5);

    assert.isTrue(flattenArray(chunk.split(2)) == ImmutableArray(ImmutableArray(0, 1, 2), ImmutableArray(3, 4, 5)));
    assert.isTrue(
      flattenArray(chunk.split(4)) ==
        ImmutableArray(ImmutableArray(0, 1), ImmutableArray(2, 3), ImmutableArray(4), ImmutableArray(5))
    );
    assert.isTrue(
      flattenArray(chunk.split(5)) ==
        ImmutableArray(ImmutableArray(0, 1), ImmutableArray(2), ImmutableArray(3), ImmutableArray(4), ImmutableArray(5))
    );
  });

  it("splitWhere", () => {
    const chunk = Chunk(0, 1, 2, 3, 4, 5);

    const {
      tuple: [left, right]
    } = chunk.splitWhere((n) => n === 3);

    assert.isTrue(left == Chunk(0, 1, 2));
    assert.isTrue(right == Chunk(3, 4, 5));
  });

  it("zip", () => {
    const leftChunk = Chunk(0, 1, 2, 3);
    const rightChunk = Chunk(0, 1, 2, 3, 4);

    const resultA = leftChunk.zip(rightChunk).asImmutableArray();
    const resultB = rightChunk.zip(leftChunk).asImmutableArray();

    assert.isTrue(resultA == ImmutableArray(Tuple(0, 0), Tuple(1, 1), Tuple(2, 2), Tuple(3, 3)));
    assert.isTrue(resultB == ImmutableArray(Tuple(0, 0), Tuple(1, 1), Tuple(2, 2), Tuple(3, 3)));
  });

  it("zipAll", () => {
    const leftChunk = Chunk(0, 1, 2, 3);
    const rightChunk = Chunk(0, 1, 2, 3, 4);

    const resultA = leftChunk.zipAll(rightChunk).asImmutableArray();
    const resultB = rightChunk.zipAll(leftChunk).asImmutableArray();

    assert.isTrue(
      resultA == ImmutableArray(
        Tuple(Option.some(0), Option.some(0)),
        Tuple(Option.some(1), Option.some(1)),
        Tuple(Option.some(2), Option.some(2)),
        Tuple(Option.some(3), Option.some(3)),
        Tuple(Option.none, Option.some(4))
      )
    );
    assert.isTrue(
      resultB == ImmutableArray(
        Tuple(Option.some(0), Option.some(0)),
        Tuple(Option.some(1), Option.some(1)),
        Tuple(Option.some(2), Option.some(2)),
        Tuple(Option.some(3), Option.some(3)),
        Tuple(Option.some(4), Option.none)
      )
    );
  });

  it("zipWithIndex", () => {
    const chunk = Chunk(1, 2, 3, 4);

    const result = chunk.zipWithIndex().asImmutableArray();

    assert.isTrue(result == ImmutableArray(Tuple(1, 0), Tuple(2, 1), Tuple(3, 2), Tuple(4, 3)));
  });

  it("fill", () => {
    const chunk = Chunk.fill(10, (n) => n + 1);

    const result = chunk.asImmutableArray();

    assert.isTrue(result == ImmutableArray(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
  });

  it("equality", () => {
    const chunk = Chunk(0, 1, 2);

    const result = chunk.equals(Chunk.from([0, 1, 2]));

    assert.isTrue(result);
  });

  it("dedupe", () => {
    const chunk = Chunk(0, 0, 1, 2, 3, 4, 4, 5, 6, 7, 7, 7, 8, 9, 9, 9, 9);

    const result = chunk.dedupe().asImmutableArray();

    assert.deepEqual(result, ImmutableArray(0, 1, 2, 3, 4, 5, 6, 7, 8, 9));
  });

  it("dropRight", () => {
    const chunk = Chunk(1, 2, 3, 4, 5, 6, 7);

    const result = chunk.dropRight(3).asImmutableArray();

    assert.isTrue(result == ImmutableArray(1, 2, 3, 4));
  });

  it("mapWithIndex", () => {
    const chunk = Chunk(1, 2, 3, 4, 5, 6, 7);

    const result = chunk.mapWithIndex((i, n) => Tuple(i, n)).asImmutableArray();

    assert.isTrue(
      result ==
        ImmutableArray(
          Tuple(0, 1),
          Tuple(1, 2),
          Tuple(2, 3),
          Tuple(3, 4),
          Tuple(4, 5),
          Tuple(5, 6),
          Tuple(6, 7)
        )
    );
  });

  it("reduceWithIndex", () => {
    const chunk = Chunk(1, 2, 3, 4, 5, 6, 7);

    const result = chunk.reduceWithIndex(
      ImmutableArray.empty<Tuple<[number, number]>>(),
      (i, acc, n) => acc + Tuple(i, n)
    );

    assert.isTrue(
      result == ImmutableArray(
        Tuple(0, 1),
        Tuple(1, 2),
        Tuple(2, 3),
        Tuple(3, 4),
        Tuple(4, 5),
        Tuple(5, 6),
        Tuple(6, 7)
      )
    );
  });

  it("reduceRightWithIndex", () => {
    const chunk = Chunk(1, 2, 3, 4, 5, 6, 7);

    const result = chunk.reduceRightWithIndex(
      ImmutableArray.empty<Tuple<[number, number]>>(),
      (i, n, acc) => acc + Tuple(i, n)
    );

    assert.isTrue(
      result ==
        ImmutableArray(
          Tuple(6, 7),
          Tuple(5, 6),
          Tuple(4, 5),
          Tuple(3, 4),
          Tuple(2, 3),
          Tuple(1, 2),
          Tuple(0, 1)
        )
    );
  });

  it("findIndex", () => {
    const chunk = Chunk(1, 2, 3, 4, 5, 6, 7);

    const result = chunk.findIndex((n) => n === 5);

    assert.isTrue(result == Option.some(4));
  });

  it("findLast - found", () => {
    const chunk = Chunk(1, 2, 3, 4, 5, 6, 7, 5, 9, 10).mapWithIndex((i, n) => ({
      id: i,
      n
    }));

    const result = chunk.findLast(({ n }) => n === 5);

    assert.deepEqual(result, Option.some({ id: 7, n: 5 }));
  });

  it("findLast - not found", () => {
    const chunk = Chunk(1, 2, 3, 4, 5, 6, 7, 5, 9, 10).mapWithIndex((i, n) => ({
      id: i,
      n
    }));

    const result = chunk.findLast(({ n }) => n === 25);

    assert.isTrue(result == Option.none);
  });

  it("findLastIndex - found", () => {
    const chunk = Chunk(1, 2, 3, 4, 5, 6, 7, 5, 9, 10).mapWithIndex((i, n) => ({
      id: i,
      n
    }));

    const result = chunk.findLastIndex(({ n }) => n === 5);

    assert.isTrue(result == Option.some(7));
  });

  it("findLastIndex - not found", () => {
    const chunk = Chunk(1, 2, 3, 4, 5, 6, 7, 5, 9, 10).mapWithIndex((i, n) => ({
      id: i,
      n
    }));

    const result = chunk.findLastIndex(({ n }) => n === 25);

    assert.isTrue(result == Option.none);
  });
  it("partitionMap", () => {
    const chunk = Chunk(1, 2, 3, 4, 5, 6);

    const result = chunk.partitionMap((n) => n % 2 === 0 ? Either.right(n) : Either.left(n));

    assert.isTrue(result == Tuple(Chunk(1, 3, 5), Chunk(2, 4, 6)));
  });
  it("separate", () => {
    const chunk = Chunk(1, 2, 3, 4, 5, 6).map((n) => n % 2 === 0 ? Either.right(n) : Either.left(n.toString()));

    const result = chunk.separate();

    assert.isTrue(result == Tuple(Chunk("1", "3", "5"), Chunk(2, 4, 6)));
  });
});
