/**
 * @tsplus type Has/Ops
 */
export interface HasOps {
  readonly sym: unique symbol;
}

export const Has: HasOps = {
  sym: Symbol("@tsplus/stdlib/environment/Has") as HasOps["sym"]
};

/**
 * @tsplus type Has
 */
export interface Has<Service> {
  readonly [Has.sym]: () => Service;
}
