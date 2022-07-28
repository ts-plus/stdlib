import { Succeed } from "@tsplus/stdlib/io/Eval/definition"

/**
 * Constructs a computation that always returns the `Unit` value.
 *
 * @tsplus static Eval.Ops unit
 */
export const unit: Eval<void> = new Succeed(() => undefined)
