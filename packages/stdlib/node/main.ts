import { ImmutableArray } from "@tsplus/stdlib/collections/ImmutableArray"
import { List } from "@tsplus/stdlib/collections/List"
import { Option } from "@tsplus/stdlib/data/Option"

console.log(ImmutableArray.from(List(0, 1, 2)) == ImmutableArray(0, 1, 2))
console.log([0, 1, 2].immutable() == ImmutableArray(0, 1, 2))
console.log(Option(0) == Option(0))
