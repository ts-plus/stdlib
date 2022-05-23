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
