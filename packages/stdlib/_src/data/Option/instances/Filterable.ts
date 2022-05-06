/**
 * @tsplus static Option/Ops Filterable
 */
export const OptionFilterable = HKT.instance<Filterable<Option.HKT>>({
  filter: Option.$.filter,
  filterMap: Option.$.filterMap,
  partition: Option.$.partition,
  partitionMap: Option.$.partitionMap
});
