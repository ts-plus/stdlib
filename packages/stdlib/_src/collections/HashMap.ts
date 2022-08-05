export {
  equals,
  equals_,
  getHash,
  getHash_,
  has,
  has_
} from "@tsplus/stdlib/collections/HashMap/_internal/hashMap"

// codegen:start {preset: barrel, include: ./HashMap/*.ts, prefix: "@tsplus/stdlib/collections"}
export * from "@tsplus/stdlib/collections/HashMap/definition"
export * from "@tsplus/stdlib/collections/HashMap/operations"
export * from "@tsplus/stdlib/collections/HashMap/patch"
// codegen:end
