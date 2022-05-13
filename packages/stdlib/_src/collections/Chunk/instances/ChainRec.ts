import type * as P from "@tsplus/stdlib/prelude/ChainRec";

/**
 * @tsplus static Chunk/Ops depthFirstChainRec
 */
export function depthFirstChainRec_<A, B>(init: A, f: (a: A) => Chunk<Either<A, B>>): Chunk<B> {
  let todo = f(init);
  let result = Chunk.empty<B>();
  while (todo.size > 0) {
    const either = todo.unsafeHead();
    todo = todo.unsafeTail();
    if (either._tag === "Left") {
      todo = f(either.left).concat(todo);
    } else {
      result = result.append(either.right);
    }
  }
  return result;
}

/**
 * @tsplus static Chunk/Aspects depthFirstChainRec
 */
export const depthFirstChainRec = Pipeable(depthFirstChainRec_);

/**
 * @tsplus static Chunk/Ops DepthFirstChainRec
 */
export const DepthFirstChainRec = HKT.instance<P.ChainRec<Chunk.HKT>>({
  chainRec: Chunk.$.depthFirstChainRec
});

/**
 * @tsplus static Chunk/Ops breadthFirstChainRec
 */
export function breadthFirstChainRec_<A, B>(init: A, f: (a: A) => Chunk<Either<A, B>>): Chunk<B> {
  let todo = f(init);
  let result = Chunk.empty<B>();
  while (todo.size > 0) {
    const either = todo.unsafeHead();
    todo = todo.unsafeTail();
    if (either._tag === "Left") {
      todo = todo.concat(f(either.left));
    } else {
      result = result.append(either.right);
    }
  }
  return result;
}

/**
 * @tsplus static Chunk/Aspects breadthFirstChainRec
 */
export const breadthFirstChainRec = Pipeable(breadthFirstChainRec_);

/**
 * @tsplus static Chunk/Ops BreadthFirstChainRec
 */
export const BreadthFirstChainRec = HKT.instance<P.ChainRec<Chunk.HKT>>({
  chainRec: Chunk.$.breadthFirstChainRec
});
