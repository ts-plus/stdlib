import type { Ord } from "../../prelude/Ord.js"
import { ListBuffer } from "../mutable/ListBuffer.js"
import type { List } from "./definition.js"

/**
 * @tsplus fluent List sortWith
 */
export function sortWith<A>(self: List<A>, ord: Ord<A>): List<A> {
  const len = self.length()
  const b = new ListBuffer<A>()
  if (len === 1) {
    b.append(self.unsafeHead()!)
  } else if (len > 1) {
    const arr = new Array<[number, A]>(len)
    copyToArrayWithIndex(self, arr)
    arr.sort(([i, x], [j, y]) => {
      const c = ord.compare(x, y)
      return c !== 0 ? c : i < j ? -1 : 1
    })
    for (let i = 0; i < len; i++) {
      b.append(arr[i]![1])
    }
  }
  return b.toList
}

function copyToArrayWithIndex<A>(list: List<A>, arr: Array<[number, A]>): void {
  let these = list
  let i = 0
  while (!these.isNil()) {
    arr[i] = [i, these.head]
    these = these.tail
    i++
  }
}
