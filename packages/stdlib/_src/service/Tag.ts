/**
 * @tsplus type Tag/Ops
 */
export interface TagOps {
  readonly sym: unique symbol
  readonly is: (u: unknown) => u is Tag<unknown>
  <S>(): Tag<S>
}

export const Tag: TagOps = Object.assign(
  <S>(): Tag<S> => ({ [Tag.sym]: identity }),
  {
    sym: Symbol("@tsplus/stdlib/environment/Tag") as TagOps["sym"],
    is: (u: unknown): u is Tag<unknown> => typeof u === "object" && u != null && Tag.sym in u
  }
)

/**
 * @tsplus type Tag
 */
export interface Tag<Service> {
  readonly [Tag.sym]: (_: never) => Service
}
