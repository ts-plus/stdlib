export const TreeTypeId = Symbol.for("@tsplus/collections/Tree")
export type TreeTypeId = typeof TreeTypeId

export type Forest<A> = Tree.Forest<A>
/**
 * @tsplus type Tree
 * @tsplus companion Tree.Ops
 */
export class Tree<A> implements Equals {
  readonly [TreeTypeId]: TreeTypeId = TreeTypeId
  constructor(readonly value: A, readonly forest: Forest<A>) {}

  [Equals.sym](this: this, other: unknown): boolean {
    return (
      Tree.isTree(other) &&
      Equals.equals(this.value, other.value) &&
      this.forest.corresponds(other.forest, (a, b) => Equals.equals(a, b))
    )
  }

  [Hash.sym](this: this): number {
    return pipe(Hash.combine(Hash.unknown(this.value), this.forest[Hash.sym]()), Hash.optimize)
  }
}

export interface TreeF extends HKT {
  readonly type: Tree<this["A"]>
}

export declare namespace Tree {
  export type HKT = TreeF
  export type Forest<A> = Chunk<Tree<A>>
}

/**
 * @tsplus type Tree.Aspects
 */
export interface TreeAspects {}
/**
 * @tsplus static Tree.Ops $
 */
export const TreeAspects: TreeAspects = {}

const empty = Chunk.empty<never>()

/**
 * @tsplus static Tree.Ops __call
 */
export function make<A>(value: A, forest: Forest<A> = empty): Tree<A> {
  return new Tree(value, forest)
}

/**
 * Type guard
 *
 * @tsplus static Tree.Ops isTree
 */
export function isTree(t: unknown): t is Tree<unknown> {
  return typeof t === "object" && t instanceof Tree && TreeTypeId in t
}
