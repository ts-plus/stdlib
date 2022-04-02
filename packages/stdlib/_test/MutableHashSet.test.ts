class Value implements Equals {
  constructor(readonly n: number) {}

  [Hash.sym](): number {
    return Hash.number(this.n);
  }

  [Equals.sym](u: unknown): boolean {
    return u instanceof Value && this.n === u.n;
  }
}

function value(n: number): Value {
  return new Value(n);
}

describe("MutableHashSet", () => {
  it("add", () => {
    const set = MutableHashSet.empty<Value>();

    set.add(value(0));
    set.add(value(1));
    set.add(value(1));

    assert.strictEqual(set.size, 2);
    assert.isTrue(set.contains(value(0)));
    assert.isTrue(set.contains(value(1)));
  });

  it("contains", () => {
    const set = MutableHashSet(value(0), value(1), value(1));

    assert.isTrue(set.contains(value(0)));
    assert.isFalse(set.contains(value(4)));
  });

  it("isEmpty", () => {
    const emptySet = MutableHashSet.empty<Value>();
    const set = MutableHashSet(value(0), value(1), value(2));

    assert.isTrue(emptySet.isEmpty());
    assert.isFalse(set.isEmpty());
  });

  it("remove", () => {
    const set = MutableHashSet(value(0), value(1), value(1));

    assert.strictEqual(set.size, 2);
    assert.isTrue(set.contains(value(1)));

    set.remove(value(1));

    assert.strictEqual(set.size, 1);
    assert.isFalse(set.contains(value(1)));
  });

  it("size", () => {
    const emptySet = MutableHashSet.empty<Value>();
    const set = MutableHashSet(value(0), value(1), value(1));

    assert.strictEqual(emptySet.size, 0);
    assert.strictEqual(set.size, 2);
  });
});
