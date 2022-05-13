import type * as P from "@tsplus/stdlib/prelude/Filterable";

/**
 * @tsplus static Chunk/Ops Filterable
 */
export const Filterable = HKT.instance<P.Filterable<Chunk.HKT>>({
  ...Chunk.Filter,
  ...Chunk.FilterMap,
  ...Chunk.Partition,
  ...Chunk.PartitionMap
});
