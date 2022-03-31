describe("HashMap", () => {
  class Key implements Equals {
    constructor(readonly n: number) {}

    [Hash.sym](): number {
      return Hash.number(this.n);
    }

    [Equals.sym](u: unknown): boolean {
      return u instanceof Key && this.n === u.n;
    }
  }

  class Value implements Equals {
    constructor(readonly s: string) {}

    [Hash.sym](): number {
      return Hash.string(this.s);
    }

    [Equals.sym](u: unknown): boolean {
      return u instanceof Value && this.s === u.s;
    }
  }

  function key(n: number): Key {
    return new Key(n);
  }

  function value(s: string): Value {
    return new Value(s);
  }

  it("has", () => {
    const hashMap = HashMap([key(0), value("a")]);

    assert.isTrue(hashMap.has(key(0)));
    assert.isFalse(hashMap.has(key(1)));
  });

  it("hasHash", () => {
    const hashMap = HashMap([key(0), value("a")]);

    assert.isTrue(hashMap.hasHash(key(0), Hash.unknown(key(0))));
    assert.isFalse(hashMap.hasHash(key(1), Hash.unknown(key(0))));
  });

  it("get", () => {
    const hashMap = HashMap([key(0), value("a")]);

    assert.isTrue(hashMap[key(0)] == Option.some(value("a")));
    assert.isTrue(hashMap[key(1)] == Option.none);
  });

  it("getHash", () => {
    const hashMap = HashMap([key(0), value("a")]);

    assert.isTrue(hashMap.getHash(key(0), Hash.unknown(0)) == Option.some(value("a")));
    assert.isTrue(hashMap.getHash(key(1), Hash.unknown(0)) == Option.none);
  });

  it("set", () => {
    let hashMap = HashMap.empty<Key, Value>();

    hashMap = hashMap.set(key(0), value("a"));

    assert.isTrue(hashMap[key(0)] == Option.some(value("a")));
  });

  it("mutation", () => {
    let hashMap = HashMap.empty();

    assert.propertyVal(hashMap, "_editable", false);

    hashMap = hashMap.beginMutation();

    assert.propertyVal(hashMap, "_editable", true);

    hashMap = hashMap.endMutation();

    assert.propertyVal(hashMap, "_editable", false);
  });

  it("mutate", () => {
    const hashMap = HashMap.empty<number, string>();

    const result = hashMap.mutate((map) => {
      map.set(0, "a");
    });

    assert.isTrue(result[0] == Option.some("a"));
    assert.isTrue(result[1] == Option.none);
  });

  it("flatMap", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("bb")]);

    const result = hashMap.flatMap(({ s }) => {
      const newKey = key(s.length);
      const newValue = value(s);
      return HashMap.empty<Key, Value>().set(newKey, newValue);
    });

    assert.isTrue(result[key(1)] == Option.some(value("a")));
    assert.isTrue(result[key(2)] == Option.some(value("bb")));
    assert.isTrue(result[key(3)] == Option.none);
  });

  it("chainWithIndex", () => {
    const hashMap = HashMap([key(1), value("a")], [key(2), value("bb")]);

    const result = hashMap.flatMapWithIndex(({ n }, { s }) => {
      const newKey = key(s.length + n);
      const newValue = value(s);
      return HashMap.empty<Key, Value>().set(newKey, newValue);
    });

    assert.isTrue(result[key(2)] == Option.some(value("a")));
    assert.isTrue(result[key(4)] == Option.some(value("bb")));
    assert.isTrue(result[key(6)] == Option.none);
  });

  it("collect", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("bb")]);

    const result = hashMap.collect(({ s }) => s.length > 1 ? Option.some(value(s)) : Option.none);

    assert.isTrue(result[key(0)] == Option.none);
    assert.isTrue(result[key(1)] == Option.some(value("bb")));
  });

  it("collectWithIndex", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("bb")]);

    const result = hashMap.collectWithIndex(({ n }, v) => n > 0 ? Option.some(v) : Option.none);

    assert.isTrue(result[key(0)] == Option.none);
    assert.isTrue(result[key(1)] == Option.some(value("bb")));
  });

  it("compact", () => {
    const hashMap = HashMap([0, Option.some("a")], [1, Option.none]);

    const result = hashMap.compact();

    assert.strictEqual(result.unsafeGet(0), "a");
    assert.throws(() => result.unsafeGet(1));
  });

  it("filter", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("bb")]);

    const result = hashMap.filter(({ s }) => s.length > 1);

    assert.isTrue(result[key(0)] == Option.none);
    assert.isTrue(result[key(1)] == Option.some(value("bb")));
  });

  it("filterWithIndex", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("bb")]);

    const result = hashMap.filterWithIndex(({ n }, { s }) => n > 0 && s.length > 0);

    assert.isTrue(result[key(0)] == Option.none);
    assert.isTrue(result[key(1)] == Option.some(value("bb")));
  });

  it("forEach", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("b")]);
    const result: Array<string> = [];

    hashMap.forEach((v) => {
      result.push(v.s);
    });

    assert.deepEqual(result, ["a", "b"]);
  });

  it("forEachWithIndex", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("b")]);
    const result: Array<[number, string]> = [];

    hashMap.forEachWithIndex(({ n }, { s }) => {
      result.push([n, s]);
    });

    assert.deepEqual(result, [[0, "a"], [1, "b"]]);
  });

  it("isEmpty", () => {
    assert.isTrue(HashMap().isEmpty());
    assert.isFalse(HashMap([key(0), value("a")]).isEmpty());
  });

  it("keys", () => {
    const hashMap = HashMap([0, "a"], [1, "b"]);

    const result = hashMap.keys();

    assert.deepEqual([...result], [0, 1]);
  });

  it("keySet", () => {
    const hashMap = HashMap(
      [key(0), value("a")],
      [key(1), value("b")],
      [key(1), value("c")]
    );

    const result = hashMap.keySet();

    assert.deepEqual([...result], [key(0), key(1)]);
  });

  it("map", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("bb")]);

    const result = hashMap.map(({ s }) => s.length);

    assert.isTrue(result[key(0)] == Option.some(1));
    assert.isTrue(result[key(1)] == Option.some(2));
    assert.isTrue(result[key(2)] == Option.none);
  });

  it("mapWithIndex", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("bb")]);

    const result = hashMap.mapWithIndex(({ n }, { s }) => n + s.length);

    assert.isTrue(result[key(0)] == Option.some(1));
    assert.isTrue(result[key(1)] == Option.some(3));
    assert.isTrue(result[key(2)] == Option.none);
  });

  it("modify", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("b")]);

    const result = hashMap.modify(key(0), (option) => option.isSome() ? Option.some(value("test")) : Option.none);

    assert.isTrue(result[key(0)] == Option.some(value("test")));
    assert.isTrue(result[key(1)] == Option.some(value("b")));
    assert.isTrue(result[key(2)] == Option.none);
  });

  it("modifyHash", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("b")]);

    const result = hashMap.modifyHash(
      key(0),
      Hash.unknown(key(0)),
      (option) => option.isSome() ? Option.some(value("test")) : Option.none
    );

    assert.isTrue(result[key(0)] == Option.some(value("test")));
    assert.isTrue(result[key(1)] == Option.some(value("b")));
    assert.isTrue(result[key(2)] == Option.none);
  });

  it("reduce", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("b")]);

    const result = hashMap.reduce("", (acc, { s }) => acc.length > 0 ? `${acc},${s}` : s);

    assert.strictEqual(result, "a,b");
  });

  it("reduceWithIndex", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("b")]);

    const result = hashMap.reduceWithIndex(
      "",
      (acc, { n }, { s }) => acc.length > 0 ? `${acc},${n}:${s}` : `${n}:${s}`
    );

    assert.strictEqual(result, "0:a,1:b");
  });

  it("remove", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("b")]);

    const result = hashMap.remove(key(0));

    assert.isTrue(result[key(0)] == Option.none);
    assert.isTrue(result[key(1)] == Option.some(value("b")));
  });

  it("removeMany", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("b")]);

    assert.isFalse(hashMap.isEmpty());

    const result = hashMap.removeMany([key(0), key(1)]);

    assert.isTrue(result.isEmpty());
  });

  it("size", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("b")]);

    const result = hashMap.size;

    assert.strictEqual(result, 2);
  });

  it("tupleIterator", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("b")]);

    const result = hashMap.asTupleCollection();

    assert.deepEqual([...result], [Tuple(key(0), value("a")), Tuple(key(1), value("b"))]);
  });

  it("union", () => {
    const map1 = HashMap([0, "a"], [1, "b"]);
    const map2 = HashMap(["foo", true], ["bar", false]);

    const result = map1 + map2;

    assert.isTrue(result[0] == Option.some("a"));
    assert.isTrue(result[1] == Option.some("b"));
    assert.isTrue(result["foo"] == Option.some(true));
    assert.isTrue(result["bar"] == Option.some(false));
  });

  it("update", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("b")]);

    const result = hashMap.update(key(0), ({ s }) => value(`${s}-${s}`));

    assert.isTrue(result[key(0)] == Option.some(value("a-a")));
    assert.isTrue(result[key(1)] == Option.some(value("b")));
    assert.isTrue(result[key(2)] == Option.none);
  });

  it("values", () => {
    const hashMap = HashMap([key(0), value("a")], [key(1), value("b")]);

    const result = hashMap.values();

    assert.deepEqual([...result], [value("a"), value("b")]);
  });
});
