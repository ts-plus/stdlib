import { fromBitmap, hashFragment, toBitmap } from "@tsplus/stdlib/collections/HashMap/_internal/bitwise";
import { SIZE } from "@tsplus/stdlib/collections/HashMap/_internal/config";
import { realHashMap } from "@tsplus/stdlib/collections/HashMap/_internal/hashMap";

/**
 * Lookup the value for the specified key in the `HashMap` using a custom hash.
 *
 * @tsplus fluent HashMap getHash
 */
export function getHash_<K, V>(self: HashMap<K, V>, key: K, hash: number): Option<V> {
  realHashMap(self);
  let node = self._root;
  let shift = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    switch (node._tag) {
      case "LeafNode": {
        return Equals.equals(key, node.key) ? node.value : Option.none;
      }
      case "CollisionNode": {
        if (hash === node.hash) {
          const children = node.children;
          for (let i = 0, len = children.length; i < len; ++i) {
            const child = children[i]!;
            if ("key" in child && Equals.equals(key, child.key)) return child.value;
          }
        }
        return Option.none;
      }
      case "IndexedNode": {
        const frag = hashFragment(shift, hash);
        const bit = toBitmap(frag);
        if (node.mask & bit) {
          node = node.children[fromBitmap(node.mask, bit)]!;
          shift += SIZE;
          break;
        }
        return Option.none;
      }
      case "ArrayNode": {
        node = node.children[hashFragment(shift, hash)]!;
        if (node) {
          shift += SIZE;
          break;
        }
        return Option.none;
      }
      default:
        return Option.none;
    }
  }
}

/**
 * Lookup the value for the specified key in the `HashMap` using a custom hash.
 *
 * @tsplus static HashMap/Aspects getHash
 */
export const getHash = Pipeable(getHash_);
