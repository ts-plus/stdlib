describe("Guard", () => {
  it("literal", () => {
    const guardStr: Guard<"Tag"> = Derive();
    assert.isTrue(guardStr.is("Tag"));
    assert.isFalse(guardStr.is("NoTag"));
    const guardNum: Guard<0> = Derive();
    assert.isTrue(guardNum.is(0));
    assert.isFalse(guardNum.is(1));
  });
  it("option", () => {
    const guard: Guard<Option<string>> = Derive();
    assert.isTrue(guard.is(Option("ok")));
    assert.isTrue(guard.is(Option.none));
    assert.isFalse(guard.is(Option(1)));
    assert.isFalse(guard.is("nope"));
  });
  it("chunk", () => {
    const guard: Guard<Chunk<number>> = Derive();
    assert.isTrue(guard.is(Chunk(0, 1, 2)));
    assert.isFalse(guard.is(Chunk(0, 1, 2, "3")));
    assert.isFalse(guard.is([0]));
    assert.isFalse(guard.is(undefined));
  });
  it("list", () => {
    const guard: Guard<List<number>> = Derive();
    assert.isTrue(guard.is(List(0, 1, 2)));
    assert.isFalse(guard.is(List(0, 1, 2, "3")));
    assert.isFalse(guard.is([0]));
    assert.isFalse(guard.is(undefined));
  });
  it("non-empty immutable array", () => {
    const guard: Guard<NonEmptyImmutableArray<number>> = Derive();
    assert.isTrue(guard.is(ImmutableArray(0, 1, 2)));
    assert.isFalse(guard.is(ImmutableArray.empty()));
    assert.isFalse(guard.is(ImmutableArray(0, 1, 2, "3")));
    assert.isFalse(guard.is([0]));
    assert.isFalse(guard.is(undefined));
  });
  it("immutable array", () => {
    const guard: Guard<ImmutableArray<number>> = Derive();
    assert.isTrue(guard.is(ImmutableArray(0, 1, 2)));
    assert.isFalse(guard.is(ImmutableArray(0, 1, 2, "3")));
    assert.isFalse(guard.is([0]));
    assert.isFalse(guard.is(undefined));
  });
  it("sorted set", () => {
    const numberSet: SortedSet<number> = Derive();
    const stringSet: SortedSet<string> = Derive();
    const guard: Guard<SortedSet<0 | 1>> = Derive();
    assert.isTrue(guard.is(numberSet.add(0).add(1)));
    assert.isFalse(guard.is(numberSet.add(0).add(1).add(2)));
    assert.isFalse(guard.is(stringSet.add("1").add("1")));
    assert.isFalse(guard.is([0]));
    assert.isFalse(guard.is(undefined));
  });
  it("array", () => {
    const guard: Guard<number[]> = Derive();
    assert.isTrue(guard.is([0, 1, 2]));
    assert.isFalse(guard.is([0, 1, 2, "3"]));
    assert.isFalse(guard.is(Chunk(0)));
    assert.isFalse(guard.is(undefined));
  });
  it("either", () => {
    const guard: Guard<Either<string, number>> = Derive();
    assert.isTrue(guard.is(Either(0)));
    assert.isTrue(guard.is(Either.left("ok")));
    assert.isFalse(guard.is(Either("nope")));
    assert.isFalse(guard.is(Either.left(0)));
    assert.isFalse(guard.is("nope"));
  });
  it("struct", () => {
    interface Person {
      name: string;
      age?: number;
      org: Option<string>;
    }
    const guard: Guard<Person> = Derive();
    assert.isTrue(guard.is({
      name: "Mike",
      age: 30,
      org: Option("Effect")
    }));
    assert.isTrue(guard.is({
      name: "Mike",
      org: Option.none
    }));
    assert.isFalse(guard.is({
      age: 30
    }));
    assert.isFalse(guard.is(0));
  });
  it("intersection", () => {
    interface Person {
      name: string;
      org: Option<string>;
    }
    interface Aged {
      age?: number;
    }
    const guard: Guard<Person & Aged> = Derive();
    assert.isTrue(guard.is({
      name: "Mike",
      age: 30,
      org: Option("Effect")
    }));
    assert.isTrue(guard.is({
      name: "Mike",
      org: Option.none
    }));
    assert.isFalse(guard.is({
      name: "Mike",
      org: Option.none,
      age: "30"
    }));
    assert.isFalse(guard.is({
      age: 30
    }));
  });
  it("union", () => {
    const guard: Guard<string | number> = Derive();
    assert.isTrue(guard.is("ok"));
    assert.isTrue(guard.is(0));
    assert.isFalse(guard.is({}));
  });
  it("tagged", () => {
    interface A {
      readonly _tag: "A";
    }
    interface B {
      readonly _tag: "B";
    }
    interface C {
      readonly _tag: "C";
    }
    type Union = A | B | C;
    const guard: Guard<Union> = Derive();
    assert.isTrue(guard.is({
      _tag: "A"
    }));
    assert.isTrue(guard.is({
      _tag: "B"
    }));
    assert.isTrue(guard.is({
      _tag: "C"
    }));
    assert.isFalse(guard.is({
      _tag: "D"
    }));
  });
  it("non-tagged", () => {
    interface A {
      readonly a: "A";
    }
    interface B {
      readonly b: "B";
    }
    interface C {
      readonly c: "C";
    }
    type Union = A | B | C;
    const guard: Guard<Union> = Derive();
    assert.isTrue(guard.is({
      a: "A"
    }));
    assert.isTrue(guard.is({
      b: "B"
    }));
    assert.isTrue(guard.is({
      c: "C"
    }));
    assert.isFalse(guard.is({
      d: "D"
    }));
  });
  it("recursive", () => {
    interface Person {
      name: string;
      friends: Chunk<Person>;
    }
    const guard: Guard<Person> = Derive();
    assert.isTrue(guard.is({
      name: "Mike",
      friends: Chunk()
    }));
    assert.isTrue(guard.is({
      name: "Mike",
      friends: Chunk({
        name: "Johanness",
        friends: Chunk()
      }, {
        name: "Maxwell",
        friends: Chunk()
      })
    }));
    assert.isFalse(guard.is({
      name: "Mike",
      friends: Chunk({
        name: "Johanness",
        friends: Chunk()
      }, {
        name: "Maxwell",
        friends: Chunk(0)
      })
    }));
  });
  it("validated", () => {
    /** @tsplus implicit local */
    const Int = Validation<number, "Int">((n) => Number.isInteger(n));
    type Int = Validation.Type<typeof Int>;
    const guard: Guard<Int> = Derive();

    assert.isTrue(guard.is(1));
    assert.isFalse(guard.is(1.5));
    assert.isFalse(guard.is("ok"));

    /** @tsplus implicit local */
    const Id = Validation<string, "Id">((n) => n.startsWith("id:"));
    type Id = Validation.Type<typeof Id>;
    const guardId: Guard<Id> = Derive();

    assert.isTrue(guardId.is("id:ok"));
    assert.isFalse(guardId.is("id2:ok"));

    assert.throw(() => {
      const x = "id2:ok";
      guardId.asserts(x);
      console.log(x);
    });
  });
});
