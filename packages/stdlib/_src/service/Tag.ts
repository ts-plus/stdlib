import { Env } from "@tsplus/stdlib/service/Env"

/**
 * @tsplus type Tag.Ops
 */
export interface TagOps {
  readonly sym: unique symbol
  readonly is: (u: unknown) => u is Tag<unknown>
  <S>(): Tag<S>
}

export const Tag: TagOps = Object.assign(
  <S>(): Tag<S> => ({
    [Tag.sym]: identity,
    toEnv(value) {
      return Env(this, value)
    },
    [Equals.sym](that) {
      return this === that
    },
    [Hash.sym]() {
      return Hash.randomCached(this)
    }
  }),
  {
    sym: Symbol("@tsplus/stdlib/environment/Tag") as TagOps["sym"],
    is: (u: unknown): u is Tag<unknown> => typeof u === "object" && u != null && Tag.sym in u
  }
)

/**
 * @tsplus type Tag
 */
export interface Tag<in out S> extends Equals {
  readonly [Tag.sym]: (_: S) => S

  toEnv(value: S): Service.Env<S>
}

export declare namespace Tag {
  type TagType<T extends Tag<any>> = T extends Tag<infer A> ? A : never
}
