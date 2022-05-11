import type * as P from "@tsplus/stdlib/prelude/ChainRec";

/**
 * @tsplus static ImmutableArray/Ops depthFirstChainRec
 */
export function depthFirstChainRec<A, B>(a: A, f: (a: A) => ImmutableArray<Either<A, B>>): ImmutableArray<B> {
  const todo: Array<Either<A, B>> = [...f(a)];
  const result: Array<B> = [];

  while (todo.length > 0) {
    const e = todo.shift()!;
    if (e._tag === "Left") {
      todo.unshift(...f(e.left));
    } else {
      result.push(e.right);
    }
  }

  return new ImmutableArray(result);
}

/**
 * @tsplus static ImmutableArray/Ops DepthFirstChainRec
 */
export const DepthFirstChainRec = HKT.instance<P.ChainRec<ImmutableArray.HKT>>({
  chainRec: (f) => (a) => depthFirstChainRec(a, f)
});

/**
 * @tsplus static ImmutableArray/Ops breadthFirstChainRec
 */
export function breadthFirstChainRec<A, B>(a: A, f: (a: A) => ImmutableArray<Either<A, B>>): ImmutableArray<B> {
  const initial = f(a);
  const todo: Array<Either<A, B>> = [];
  const result: Array<B> = [];
  for (const e of initial) {
    if (e._tag === "Left") {
      f(e.left).array.forEach((v) => todo.push(v));
    } else {
      result.push(e.right);
    }
  }
  while (todo.length > 0) {
    const e = todo.shift()!;
    if (e._tag === "Left") {
      f(e.left).array.forEach((v) => todo.push(v));
    } else {
      result.push(e.right);
    }
  }
  return new ImmutableArray(result);
}

/**
 * @tsplus static ImmutableArray/Ops BreadthFirstChainRec
 */
export const BreadthFirstChainRec = HKT.instance<P.ChainRec<ImmutableArray.HKT>>({
  chainRec: (f) => (a) => breadthFirstChainRec(a, f)
});
