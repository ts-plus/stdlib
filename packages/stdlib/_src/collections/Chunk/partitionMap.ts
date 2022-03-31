/**
 * Partitions the elements of this chunk into two chunks using the specified
 * function.
 *
 * @tsplus fluent Chunk partitionMap
 */
export function partitionMap_<A, B, C>(
  self: Chunk<A>,
  f: (a: A) => Either<B, C>
): Tuple<[Chunk<B>, Chunk<C>]> {
  let bs = Chunk.empty<B>();
  let cs = Chunk.empty<C>();

  self.forEach((a) => {
    const x = f(a);
    if (x._tag === "Left") {
      bs = bs.append(x.left);
    } else {
      cs = cs.append(x.right);
    }
  });

  return Tuple(bs, cs);
}

/**
 * Partitions the elements of this chunk into two chunks using the specified
 * function.
 *
 * @tsplus static Chunk/Aspects partitionMap
 */
export const partitionMap = Pipeable(partitionMap_);
