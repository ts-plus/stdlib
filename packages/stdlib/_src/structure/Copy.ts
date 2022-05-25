export interface CopyOps {
  readonly sym: unique symbol
}

export const Copy: CopyOps = {
  sym: Symbol("@tsplus/data/Value/Copy") as CopyOps["sym"]
}

/**
 * @tsplus type Copy
 */
export interface Copy {
  [Copy.sym](this: this, that: Partial<this>): this
}

/**
 * @tsplus fluent Copy copy
 */
export function copy<A extends Copy>(self: A, that: Partial<A>) {
  return self[Copy.sym](that)
}
