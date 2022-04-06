const failure = Result.fail("failure");
const success = Result.success("success");
const warning = Result.successWithWarning("warning", "success");

describe.concurrent("Result", () => {
  it("getSuccess", () => {
    assert.isTrue(success.getSuccess() == Option.some("success"));
    assert.isTrue(failure.getSuccess() == Option.none);
    assert.isTrue(warning.getSuccess() == Option.some("success"));
  });
  it("getFailure", () => {
    assert.isTrue(success.getFailure() == Option.none);
    assert.isTrue(failure.getFailure() == Option.some("failure"));
    assert.isTrue(warning.getFailure() == Option.none);
  });
  it("getWarning", () => {
    assert.isTrue(success.getWarning() == Option.none);
    assert.isTrue(failure.getWarning() == Option.none);
    assert.isTrue(warning.getWarning() == Option.some("warning"));
  });
  it("getWarningOrFailure", () => {
    assert.isTrue(success.getWarningOrFailure() == Option.none);
    assert.isTrue(warning.getWarningOrFailure() == Option.some(Either.left("warning")));
    assert.isTrue(failure.getWarningOrFailure() == Option.some(Either.right("failure")));
  });
});
