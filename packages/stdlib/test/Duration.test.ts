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
  it(">", () => {
    assert.isTrue(
      (30).seconds > (20).seconds
    );
    assert.isFalse(
      (30).seconds > (30).seconds
    );
    assert.isFalse(
      (30).seconds > (1).minutes
    );
  });
  it(">=", () => {
    assert.isTrue(
      (30).seconds >= (20).seconds
    );
    assert.isTrue(
      (30).seconds >= (30).seconds
    );
    assert.isFalse(
      (30).seconds >= (1).minutes
    );
  });
  it("<", () => {
    assert.isTrue(
      (20).seconds < (30).seconds
    );
    assert.isFalse(
      (30).seconds < (30).seconds
    );
    assert.isFalse(
      (1).minutes < (30).seconds
    );
  });
  it("<=", () => {
    assert.isTrue(
      (20).seconds <= (30).seconds
    );
    assert.isTrue(
      (30).seconds <= (30).seconds
    );
    assert.isFalse(
      (1).minutes <= (30).seconds
    );
  });
});
