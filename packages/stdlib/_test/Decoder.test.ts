describe.concurrent("Decoder", () => {
  it("string", () => {
    const string: Decoder<string> = Derive();
    assert.isTrue(
      string.parseJSON(JSON.stringify("hello")) == Either.right("hello")
    );
    assert.equal(
      string.parseJSON(JSON.stringify(1)).left.value,
      `Expected a value of type "string" but received one of type "number"`
    );
  });
  it("number", () => {
    const string: Decoder<number> = Derive();
    assert.isTrue(
      string.parseJSON(JSON.stringify(1)) == Either.right(1)
    );
    assert.equal(
      string.parseJSON(JSON.stringify("hello")).left.value,
      `Expected a value of type "number" but received one of type "string"`
    );
  });
  it("date", () => {
    const string: Decoder<Date> = Derive();
    const date = new Date();
    assert.deepEqual(
      string.parseJSON(JSON.stringify(date)).right.value,
      date
    );
    assert.deepEqual(
      string.parseJSON(JSON.stringify({})).left.value,
      `Expected a value of type "string" but received one of type "object"`
    );
    assert.deepEqual(
      string.parseJSON(JSON.stringify("hello")).left.value,
      `Expected a Date represented as an iso string instead received "hello"`
    );
  });
  it("literal-str", () => {
    const decoder: Decoder<"hello"> = Derive();
    assert.deepEqual(
      decoder.parseJSON(JSON.stringify("hello")).right.value,
      "hello"
    );
    assert.deepEqual(
      decoder.parseJSON(JSON.stringify("no-hello")).left.value,
      `Expected literal "hello" instead received "no-hello"`
    );
    assert.deepEqual(
      decoder.parseJSON(JSON.stringify(1)).left.value,
      `Expected literal "hello" instead received one of type "number"`
    );
  });
  it("literal-num", () => {
    const decoder: Decoder<1> = Derive();
    assert.deepEqual(
      decoder.parseJSON(JSON.stringify(1)).right.value,
      1
    );
    assert.deepEqual(
      decoder.parseJSON(JSON.stringify("no-hello")).left.value,
      `Expected literal "1" of type "number" instead received one of type "string"`
    );
    assert.deepEqual(
      decoder.parseJSON(JSON.stringify(200)).left.value,
      `Expected literal "1" of type "number" instead received "200"`
    );
  });
  it("struct", () => {
    interface Person {
      firstName: string;
      lastName: string;
      age?: number;
    }
    const decoder: Decoder<Person> = Derive();
    assert.deepEqual(
      decoder.parse({ firstName: "Michael", lastName: "Arnaldi" }).right.value,
      { firstName: "Michael", lastName: "Arnaldi" }
    );
    assert.deepEqual(
      decoder.parse({ firstName: "Michael", lastName: "Arnaldi", age: 30 }).right.value,
      { firstName: "Michael", lastName: "Arnaldi", age: 30 }
    );
    assert.isTrue(
      decoder.parse({ firstName: "Michael", lastName: "Arnaldi", age: "30" }) ==
        Either.left(
          "Encountered while parsing an object structure\n" +
            "└─ Field \"age\"\n" +
            "   └─ Expected a value of type \"number\" but received one of type \"string\""
        )
    );
    assert.isTrue(
      decoder.parse({ lastName: "Arnaldi", age: "30" }) ==
        Either.left(
          "Encountered while parsing an object structure\n" +
            "├─ Field \"firstName\"\n" +
            "│  └─ Missing\n" +
            "└─ Field \"age\"\n" +
            "   └─ Expected a value of type \"number\" but received one of type \"string\""
        )
    );
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
      readonly field: string;
    }
    type Union = A | B | C;
    const decoder: Decoder<Union> = Derive();
    assert.deepEqual(
      decoder.parse({
        _tag: "A"
      }).right.value,
      { _tag: "A" }
    );
    assert.deepEqual(
      decoder.parse({
        _tag: "B"
      }).right.value,
      { _tag: "B" }
    );
    assert.deepEqual(
      decoder.parse({
        _tag: "C",
        field: "F"
      }).right.value,
      { _tag: "C", field: "F" }
    );
    assert.equal(
      decoder.parse({
        _tag: "D"
      }).left.value,
      "Expected a tagged object of the form \"{ _tag: \"A\" | \"B\" | \"C\" }\""
    );
    assert.equal(
      decoder.parse({
        _tag: "C"
      }).left.value,
      "Encountered while processing tagged object \"C\"\n" +
        "└─ Encountered while parsing an object structure\n" +
        "   └─ Field \"field\"\n" +
        "      └─ Missing"
    );
  });
  it("union", () => {
    const decoder: Decoder<string | number> = Derive();
    assert.equal(
      decoder.parse("ok").right.value,
      "ok"
    );
    assert.equal(
      decoder.parse(1).right.value,
      1
    );
    assert.equal(
      decoder.parse({}).left.value,
      "Encountered while processing union\n" +
        "├─ Encountered while processing a union member\n" +
        "│  └─ Expected a value of type \"string\" but received one of type \"object\"\n" +
        "└─ Encountered while processing a union member\n" +
        "   └─ Expected a value of type \"number\" but received one of type \"object\""
    );
  });
  it("array", () => {
    const decoder: Decoder<string[]> = Derive();
    assert.deepEqual(
      decoder.parse(["a", "b", "c"]).right.value,
      ["a", "b", "c"]
    );
    assert.isTrue(
      decoder.parse(["a", 0, "b", 1, "c"]) == Either.left(
        "Encountered while processing an Array of elements\n" +
          "├─ Encountered while processing element \"1\"\n" +
          "│  └─ Expected a value of type \"string\" but received one of type \"number\"\n" +
          "└─ Encountered while processing element \"3\"\n" +
          "   └─ Expected a value of type \"string\" but received one of type \"number\""
      )
    );
    assert.isTrue(
      decoder.parse(0) == Either.left(
        "Expected a value of type \"Array\" but received one of type \"number\""
      )
    );
  });
  it("chunk", () => {
    const decoder: Decoder<Chunk<string>> = Derive();
    assert.isTrue(
      decoder.parse(["a", "b", "c"]) == Either.right(Chunk("a", "b", "c"))
    );
    assert.isTrue(
      decoder.parse(0) == Either.left(
        "Expected a value of type \"Array\" but received one of type \"number\""
      )
    );
  });
  it("list", () => {
    const decoder: Decoder<List<string>> = Derive();
    assert.isTrue(
      decoder.parse(["a", "b", "c"]) == Either.right(List("a", "b", "c"))
    );
    assert.isTrue(
      decoder.parse(0) == Either.left(
        "Expected a value of type \"Array\" but received one of type \"number\""
      )
    );
  });
  it("immutable array", () => {
    const decoder: Decoder<ImmutableArray<string>> = Derive();
    assert.isTrue(
      decoder.parse(["a", "b", "c"]) == Either.right(ImmutableArray("a", "b", "c"))
    );
    assert.isTrue(
      decoder.parse(0) == Either.left(
        "Expected a value of type \"Array\" but received one of type \"number\""
      )
    );
  });
  it("either", () => {
    const decoder: Decoder<Either<number, string>> = Derive();
    assert.isTrue(
      decoder.parse({
        _tag: "Left",
        left: 0
      }) == Either.right(Either.left(0))
    );
    assert.isTrue(
      decoder.parse({
        _tag: "Right",
        right: "ok"
      }) == Either.right(Either.right("ok"))
    );
    assert.isTrue(
      decoder.parse({
        _tag: "Left",
        left: "ok"
      }) == Either.left(
        "Encountered while processing tagged object \"Left\"\n" +
          "└─ Encountered while parsing an object structure\n" +
          "   └─ Field \"left\"\n" +
          "      └─ Expected a value of type \"number\" but received one of type \"string\""
      )
    );
  });
  it("option", () => {
    const decoder: Decoder<Option<string>> = Derive();
    assert.isTrue(
      decoder.parse({
        _tag: "Some",
        value: "ok"
      }) == Either.right(Option.some("ok"))
    );
    assert.isTrue(
      decoder.parse({
        _tag: "None"
      }) == Either.right(Option.none)
    );
    assert.isTrue(
      decoder.parse({
        _tag: "Left"
      }) == Either.left("Expected a tagged object of the form \"{ _tag: \"None\" | \"Some\" }\"")
    );
  });
});
