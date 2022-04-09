/**
 * @tsplus type Tag/Ops
 */
export interface TagOps {
  readonly sym: unique symbol;
  readonly state: AtomicNumber;
  readonly is: (u: unknown) => u is Tag<unknown>;
  <S>(): Tag<S>;
}

export const Tag: TagOps = Object.assign(
  function<S>(): Tag<S> {
    const id = Tag.state.incrementAndGet();
    const hash = Hash.number(id);
    return {
      id,
      [Tag.sym]: (_) => _,
      [Hash.sym]: () => hash,
      [Equals.sym]: (_) => typeof _ === "object" && _ != null && Tag.sym in _ ? (_ as Tag<unknown>).id === id : false
    };
  },
  {
    sym: Symbol("@tsplus/stdlib/environment/Tag") as TagOps["sym"],
    state: new AtomicNumber(0),
    is: (u: unknown): u is Tag<unknown> => typeof u === "object" && u != null && Tag.sym in u
  }
);

/**
 * @tsplus type Tag
 */
export interface Tag<Service> extends Equals {
  readonly [Tag.sym]: (_: never) => Service;
  readonly id: number;
}
