import { assert, describe, it } from "vitest";

describe("Duration", () => {
  it("equals", () => {
    assert.isTrue(
      (1).hours
        == (60).minutes
    );
  });
  it("times", () => {
    assert.isTrue(
      (1).minutes
        == (1).seconds * 60
    );
  });
  it("add", () => {
    assert.isTrue(
      (1).minutes
        == (30).seconds + (30).seconds
    );
  });
});
