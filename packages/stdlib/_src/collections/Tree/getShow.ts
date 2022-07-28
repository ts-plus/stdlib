/**
 * @tsplus static Tree.Ops getShow
 */
export function getShow<A>(S: Show<A>): Show<Tree<A>> {
  return Show(show_)
  function show_(tree: Tree<A>): string {
    return `Tree(${S.show(tree.value)}, ${tree.forest.map(show_)})`
  }
}
