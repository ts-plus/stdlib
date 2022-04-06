export type Forest<A> = Chunk<Tree<A>>;

/**
 * @tsplus type Tree
 */
export interface Tree<A> {
  readonly value: A;
  readonly forest: Forest<A>;
}

/**
 * @tsplus type Tree/Ops
 */
export interface TreeOps {}
export const Tree: TreeOps = {};

const empty = Chunk.empty<never>();

/**
 * @tsplus static Tree/Ops __call
 */
export function tree<A>(value: A, forest: Forest<A> = empty): Tree<A> {
  return {
    value,
    forest
  };
}

/**
 * @tsplus fluent Tree draw
 */
export function drawTree(tree: Tree<string>): string {
  return tree.value + drawForest("\n", tree.forest);
}

function drawForest(indentation: string, forest: Chunk<Tree<string>>): string {
  let r = "";
  const len = forest.length;
  let tree: Tree<string>;
  for (let i = 0; i < len; i++) {
    tree = forest.unsafeGet(i);
    const isLast = i === len - 1;
    r += indentation + (isLast ? "└" : "├") + "─ " + tree.value;
    r += drawForest(indentation + (len > 1 && !isLast ? "│  " : "   "), tree.forest);
  }
  return r;
}
