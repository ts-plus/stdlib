describe.concurrent("String", () => {
  describe.concurrent("takeLeft", () => {
    it("should take the specified number of characters from the left side of a string", () => {
      const string = "Hello, World!";

      const result = string.takeLeft(7);

      assert.strictEqual(result, "Hello, ");
    });

    it("should return the string for `n` larger than the string length", () => {
      const string = "Hello, World!";

      const result = string.takeLeft(100);

      assert.strictEqual(result, string);
    });

    it("should return the empty string for a negative `n`", () => {
      const string = "Hello, World!";

      const result = string.takeLeft(-1);

      assert.strictEqual(result, "");
    });

    it("should round down if `n` is a float", () => {
      const string = "Hello, World!";

      const result = string.takeLeft(5.5);

      assert.strictEqual(result, "Hello");
    });
  });

  describe.concurrent("takeRight", () => {
    it("should take the specified number of characters from the right side of a string", () => {
      const string = "Hello, World!";

      const result = string.takeRight(7);

      assert.strictEqual(result, " World!");
    });

    it("should return the string for `n` larger than the string length", () => {
      const string = "Hello, World!";

      const result = string.takeRight(100);

      assert.strictEqual(result, string);
    });

    it("should return the empty string for a negative `n`", () => {
      const string = "Hello, World!";

      const result = string.takeRight(-1);

      assert.strictEqual(result, "");
    });

    it("should round down if `n` is a float", () => {
      const string = "Hello, World!";

      const result = string.takeRight(6.5);

      assert.strictEqual(result, "World!");
    });
  });

  describe.concurrent("stripMargin", () => {
    it("should strip a leading prefix from each line", () => {
      const string = `|
    |Hello,
    |World!
    |`;

      const result = string.stripMargin();

      assert.strictEqual(result, "\nHello,\nWorld!\n");
    });

    it("should strip a leading prefix from each line using a margin character", () => {
      const string = `$
    $Hello,
    $World!
    $`;

      const result = string.stripMarginWith("$");

      assert.strictEqual(result, "\nHello,\nWorld!\n");
    });
  });
});
