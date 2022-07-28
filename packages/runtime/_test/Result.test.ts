const failure = Result.fail("failure")
const success = Result.success("success")
const warning = Result.successWithWarning("success", "warning")

describe.concurrent("Result", () => {
  it("getSuccess", () => {
    assert.isTrue(success.getSuccess() == Maybe.some("success"))
    assert.isTrue(failure.getSuccess() == Maybe.none)
    assert.isTrue(warning.getSuccess() == Maybe.some("success"))
  })
  it("getFailure", () => {
    assert.isTrue(success.getFailure() == Maybe.none)
    assert.isTrue(failure.getFailure() == Maybe.some("failure"))
    assert.isTrue(warning.getFailure() == Maybe.none)
  })
  it("getWarning", () => {
    assert.isTrue(success.getWarning() == Maybe.none)
    assert.isTrue(failure.getWarning() == Maybe.none)
    assert.isTrue(warning.getWarning() == Maybe.some("warning"))
  })
  it("getWarningOrFailure", () => {
    assert.isTrue(success.getWarningOrFailure() == Maybe.none)
    assert.isTrue(warning.getWarningOrFailure() == Maybe.some(Either.left("warning")))
    assert.isTrue(failure.getWarningOrFailure() == Maybe.some(Either.right("failure")))
  })
})
