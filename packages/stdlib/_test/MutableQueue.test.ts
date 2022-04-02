import { EmptyMutableQueue } from "@tsplus/stdlib/collections/mutable/MutableQueue";

describe("MutableQueue", () => {
  describe("bounded", () => {
    it("capacity", () => {
      const queue = MutableQueue.bounded<number>(2);

      assert.strictEqual(queue.capacity, 2);
    });

    it("isEmpty", () => {
      const queue = MutableQueue.bounded<number>(2);

      assert.isTrue(queue.isEmpty);

      queue.offerAll(ImmutableArray(0, 1, 2, 3, 4, 5));

      assert.isFalse(queue.isEmpty);
    });

    it("isFull", () => {
      const queue = MutableQueue.bounded<number>(2);

      assert.isFalse(queue.isFull);

      queue.offer(0);

      assert.isFalse(queue.isFull);

      queue.offer(1);

      assert.isTrue(queue.isFull);
    });

    it("offer", () => {
      const queue = MutableQueue.bounded<number>(2);

      queue.offer(0);
      queue.offer(1);
      queue.offer(2);

      assert.isTrue(
        queue.asImmutableArray() == ImmutableArray(0, 1)
      );
    });

    it("offerAll", () => {
      const queue = MutableQueue.bounded<number>(2);

      queue.offerAll(ImmutableArray(0, 1, 2, 3, 4, 5));

      assert.isTrue(
        queue.asImmutableArray() == ImmutableArray(0, 1)
      );
    });

    it("poll", () => {
      const queue = MutableQueue.bounded<number>(2);

      assert.strictEqual(queue.poll(EmptyMutableQueue), EmptyMutableQueue);

      queue.offer(0);

      assert.strictEqual(queue.poll(EmptyMutableQueue), 0);
    });

    it("pollUpTo", () => {
      const queue = MutableQueue.bounded<number>(5);

      assert.isTrue(queue.pollUpTo(2) == Chunk.empty());

      queue.offerAll(ImmutableArray(1, 2, 3, 4, 5));

      assert.strictEqual(queue.size, 5);
      assert.isTrue(queue.pollUpTo(2) == Chunk(1, 2));
      assert.strictEqual(queue.size, 3);
    });

    it("size", () => {
      const queue = MutableQueue.bounded<number>(2);

      assert.strictEqual(queue.size, 0);

      queue.offerAll(ImmutableArray(0, 1, 2, 3, 4, 5));

      assert.strictEqual(queue.size, 2);
    });
  });

  describe("unbounded", () => {
    it("capacity", () => {
      const queue = MutableQueue.unbounded<number>();

      assert.strictEqual(queue.capacity, Number.MAX_SAFE_INTEGER);
    });

    it("isEmpty", () => {
      const queue = MutableQueue.unbounded<number>();

      assert.isTrue(queue.isEmpty);

      queue.offerAll(ImmutableArray(0, 1, 2, 3, 4, 5));

      assert.isFalse(queue.isEmpty);
    });

    it("isFull", () => {
      const queue = MutableQueue.unbounded<number>();

      assert.isFalse(queue.isFull);

      queue.offer(0);

      assert.isFalse(queue.isFull);

      queue.offerAll(ImmutableArray(1, 2, 3, 4, 5));

      assert.isFalse(queue.isFull);
    });

    it("offer", () => {
      const queue = MutableQueue.unbounded<number>();

      queue.offer(0);
      queue.offer(1);
      queue.offer(2);

      assert.isTrue(
        queue.asImmutableArray() == ImmutableArray(0, 1, 2)
      );
    });

    it("offerAll", () => {
      const queue = MutableQueue.unbounded<number>();

      queue.offerAll(ImmutableArray(0, 1, 2, 3, 4, 5));

      assert.isTrue(
        queue.asImmutableArray() == ImmutableArray(0, 1, 2, 3, 4, 5)
      );
    });

    it("poll", () => {
      const queue = MutableQueue.unbounded<number>();

      assert.strictEqual(queue.poll(EmptyMutableQueue), EmptyMutableQueue);

      queue.offer(0);

      assert.strictEqual(queue.poll(EmptyMutableQueue), 0);
    });

    it("pollUpTo", () => {
      const queue = MutableQueue.unbounded<number>();

      assert.isTrue(queue.pollUpTo(2) == Chunk.empty());

      queue.offerAll(ImmutableArray(1, 2, 3, 4, 5));

      assert.strictEqual(queue.size, 5);
      assert.isTrue(queue.pollUpTo(2) == Chunk(1, 2));
      assert.strictEqual(queue.size, 3);
    });

    it("size", () => {
      const queue = MutableQueue.unbounded<number>();

      assert.strictEqual(queue.size, 0);

      queue.offerAll(ImmutableArray(0, 1, 2, 3, 4, 5));

      assert.strictEqual(queue.size, 6);
    });
  });
});
