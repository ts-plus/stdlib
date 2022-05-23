describe.concurrent("Decoder", () => {
  it("true", () => {
    const _true: Decoder<true> = Derive();
    assert.isTrue(
      _true.decodeJSON(JSON.stringify(true)) == Either.right(true)
    );
    assert.equal(
      _true.decodeJSON(JSON.stringify(1)).left.value,
      `Expected a value of type "true" but received one of type "number"`
    );
  });
  it("false", () => {
    const _false: Decoder<false> = Derive();
    assert.isTrue(
      _false.decodeJSON(JSON.stringify(false)) == Either.right(false)
    );
    assert.equal(
      _false.decodeJSON(JSON.stringify(1)).left.value,
      `Expected a value of type "false" but received one of type "number"`
    );
  });
  it("boolean", () => {
    const boolean: Decoder<boolean> = Derive();
    assert.isTrue(
      boolean.decodeJSON(JSON.stringify(true)) == Either.right(true)
    );
    assert.isTrue(
      boolean.decodeJSON(JSON.stringify(false)) == Either.right(false)
    );
    assert.equal(
      boolean.decodeJSON(JSON.stringify(1)).left.value,
      `Expected a value of type "boolean" but received one of type "number"`
    );
  });
  it("string", () => {
    const string: Decoder<string> = Derive();
    assert.isTrue(
      string.decodeJSON(JSON.stringify("hello")) == Either.right("hello")
    );
    assert.equal(
      string.decodeJSON(JSON.stringify(1)).left.value,
      `Expected a value of type "string" but received one of type "number"`
    );
  });
  it("number", () => {
    const number: Decoder<number> = Derive();
    assert.isTrue(
      number.decodeJSON(JSON.stringify(1)) == Either.right(1)
    );
    assert.equal(
      number.decodeJSON(JSON.stringify("hello")).left.value,
      `Expected a value of type "number" but received one of type "string"`
    );
  });
  it("date", () => {
    const string: Decoder<Date> = Derive();
    const date = new Date();
    assert.deepEqual(string.decodeJSON(JSON.stringify(date)).right.value, date);
    assert.deepEqual(
      string.decodeJSON(JSON.stringify({})).left.value,
      `Expected a value of type "string" but received one of type "object"`
    );
    assert.deepEqual(
      string.decodeJSON(JSON.stringify("hello")).left.value,
      `Expected a Date represented as an iso string instead received "hello"`
    );
  });
  it("literal-str", () => {
    const decoder: Decoder<"hello"> = Derive();
    assert.deepEqual(
      decoder.decodeJSON(JSON.stringify("hello")).right.value,
      "hello"
    );
    assert.deepEqual(
      decoder.decodeJSON(JSON.stringify("no-hello")).left.value,
      `Expected literal "hello" instead received "no-hello"`
    );
    assert.deepEqual(
      decoder.decodeJSON(JSON.stringify(1)).left.value,
      `Expected literal "hello" instead received one of type "number"`
    );
  });
  it("literal-num", () => {
    const decoder: Decoder<1> = Derive();
    assert.deepEqual(decoder.decodeJSON(JSON.stringify(1)).right.value, 1);
    assert.deepEqual(
      decoder.decodeJSON(JSON.stringify("no-hello")).left.value,
      `Expected literal "1" of type "number" instead received one of type "string"`
    );
    assert.deepEqual(
      decoder.decodeJSON(JSON.stringify(200)).left.value,
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
      decoder.decode({ firstName: "Michael", lastName: "Arnaldi" }).right.value,
      { firstName: "Michael", lastName: "Arnaldi" }
    );
    assert.deepEqual(
      decoder.decode({ firstName: "Michael", lastName: "Arnaldi", age: 30 }).right.value,
      { firstName: "Michael", lastName: "Arnaldi", age: 30 }
    );
    assert.isTrue(
      decoder.decode({ firstName: "Michael", lastName: "Arnaldi", age: "30" }) ==
        Either.left(
          "Encountered while parsing an object structure\n" +
            "└─ Field \"age\"\n" +
            "   └─ Expected a value of type \"number\" but received one of type \"string\""
        )
    );
    assert.isTrue(
      decoder.decode({ lastName: "Arnaldi", age: "30" }) ==
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
    assert.deepEqual(decoder.decode({ _tag: "A" }).right.value, { _tag: "A" });
    assert.deepEqual(decoder.decode({ _tag: "B" }).right.value, { _tag: "B" });
    assert.deepEqual(decoder.decode({ _tag: "C", field: "F" }).right.value, { _tag: "C", field: "F" });
    assert.isTrue(
      decoder.decode({ _tag: "D" }) ==
        Either.left("Expected a tagged object of the form \"{ _tag: \"A\" | \"B\" | \"C\" }\"")
    );
    assert.isTrue(
      decoder.decode({ _tag: "C" }) ==
        Either.left(
          "Encountered while processing tagged object \"C\"\n" +
            "└─ Encountered while parsing an object structure\n" +
            "   └─ Field \"field\"\n" +
            "      └─ Missing"
        )
    );
  });
  it("union", () => {
    const decoder: Decoder<string | number> = Derive();
    assert.equal(decoder.decode("ok").right.value, "ok");
    assert.equal(decoder.decode(1).right.value, 1);
    assert.isTrue(
      decoder.decode({}) ==
        Either.left(
          "Encountered while processing union\n" +
            "├─ Encountered while processing a union member\n" +
            "│  └─ Expected a value of type \"string\" but received one of type \"object\"\n" +
            "└─ Encountered while processing a union member\n" +
            "   └─ Expected a value of type \"number\" but received one of type \"object\""
        )
    );
  });
  it("array", () => {
    const decoder: Decoder<string[]> = Derive();
    assert.deepEqual(decoder.decode(["a", "b", "c"]).right.value, ["a", "b", "c"]);
    assert.isTrue(
      decoder.decode(["a", 0, "b", 1, "c"]) ==
        Either.left(
          "Encountered while processing an Array of elements\n" +
            "├─ Encountered while processing element \"1\"\n" +
            "│  └─ Expected a value of type \"string\" but received one of type \"number\"\n" +
            "└─ Encountered while processing element \"3\"\n" +
            "   └─ Expected a value of type \"string\" but received one of type \"number\""
        )
    );
    assert.isTrue(
      decoder.decode(0) == Either.left("Expected a value of type \"Array\" but received one of type \"number\"")
    );
  });
  it("chunk", () => {
    const decoder: Decoder<Chunk<string>> = Derive();
    assert.isTrue(decoder.decode(["a", "b", "c"]) == Either.right(Chunk("a", "b", "c")));
    assert.isTrue(
      decoder.decode(0) == Either.left("Expected a value of type \"Array\" but received one of type \"number\"")
    );
  });
  it("list", () => {
    const decoder: Decoder<List<string>> = Derive();
    assert.isTrue(decoder.decode(["a", "b", "c"]) == Either.right(List("a", "b", "c")));
    assert.isTrue(
      decoder.decode(0) == Either.left("Expected a value of type \"Array\" but received one of type \"number\"")
    );
  });
  it("immutable array", () => {
    const decoder: Decoder<ImmutableArray<string>> = Derive();
    assert.isTrue(
      decoder.decode(["a", "b", "c"]) == Either.right(ImmutableArray("a", "b", "c"))
    );
    assert.isTrue(
      decoder.decode(0) == Either.left("Expected a value of type \"Array\" but received one of type \"number\"")
    );
  });
  it("either", () => {
    const decoder: Decoder<Either<number, string>> = Derive();
    assert.isTrue(decoder.decode({ _tag: "Left", left: 0 }) == Either.right(Either.left(0)));
    assert.isTrue(decoder.decode({ _tag: "Right", right: "ok" }) == Either.right(Either.right("ok")));
    assert.isTrue(
      decoder.decode({ _tag: "Left", left: "ok" }) ==
        Either.left(
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
      decoder.decode({
        _tag: "Some",
        value: "ok"
      }) == Either.right(Option.some("ok"))
    );
    assert.isTrue(
      decoder.decode({
        _tag: "None"
      }) == Either.right(Option.none)
    );
    assert.isTrue(
      decoder.decode({
        _tag: "Left"
      }) == Either.left("Expected a tagged object of the form \"{ _tag: \"None\" | \"Some\" }\"")
    );
  });
  it("validated", () => {
    /** @tsplus implicit local */
    const Int = Validation<number, "Int">((n) => Number.isInteger(n));
    type Int = Validation.Type<typeof Int>;
    const decoder: Decoder<Int> = Derive();

    assert.isTrue(decoder.decode(1) == Either.right(1));
    assert.isTrue(
      decoder.decode("1") == Either.left("Expected a value of type \"number\" but received one of type \"string\"")
    );

    /** @tsplus implicit local */
    const Positive = Validation<number, "Positive">((n) => n >= 0);
    type Positive = Validation.Type<typeof Positive>;
    const decoderPositive: Decoder<Positive> = Derive();

    assert.isTrue(decoderPositive.decode(1) == Either.right(1));
    assert.isTrue(decoderPositive.decode(-1) == Either.left("Encountered while processing validations: Positive"));

    const positiveInt: Decoder<Positive & Int> = Derive();

    assert.isTrue(positiveInt.decode(-1.5) == Either.left("Encountered while processing validations: Int, Positive"));
    assert.isTrue(positiveInt.decode(-1) == Either.left("Encountered while processing validations: Positive"));
  });
  it("record", () => {
    const decoder: Decoder<Record<string, { foo: string; }>> = Derive();
    const decoder2: Decoder<Record<"a", { foo: string; }>> = Derive();
    const decoder3: Decoder<Record<"a" | "b", { foo: string; }>> = Derive();
    assert.deepEqual(decoder.decode({ a: { foo: "ok" } }), Either.right({ a: { foo: "ok" } }));
    assert.deepEqual(decoder2.decode({ a: { foo: "ok" } }), Either.right({ a: { foo: "ok" } }));
    assert.deepEqual(
      decoder2.decode({}),
      Either.left("Encountered while parsing a record structure, missing keys: \"a\"")
    );
    assert.deepEqual(
      decoder3.decode({}),
      Either.left("Encountered while parsing a record structure, missing keys: \"a\", \"b\"")
    );
    console.log(decoder2.decode({ b: { foo: "ok" } }));
    assert.deepEqual(
      decoder2.decode({ b: { foo: "ok" } }),
      Either.left(
        "Encountered while parsing a record structure, missing keys: \"a\""
      )
    );
  });
});
