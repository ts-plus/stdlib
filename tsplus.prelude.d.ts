/**
 * Ensure types are in scope
 */
import type {} from "@tsplus/stdlib";
/**
 * @tsplus global
 */
import { Chunk } from "@tsplus/stdlib/collections/Chunk/definition";
/**
 * @tsplus global
 */
import { Collection } from "@tsplus/stdlib/collections/Collection/definition";
/**
 * @tsplus global
 */
import { HashMap } from "@tsplus/stdlib/collections/HashMap/definition";
/**
 * @tsplus global
 */
import { HashSet } from "@tsplus/stdlib/collections/HashSet/definition";
/**
 * @tsplus global
 */
import { ImmutableArray } from "@tsplus/stdlib/collections/ImmutableArray";
/**
 * @tsplus global
 */
import { ImmutableQueue } from "@tsplus/stdlib/collections/ImmutableQueue/definition";
/**
 * @tsplus global
 */
import { List } from "@tsplus/stdlib/collections/List/definition";
/**
 * @tsplus global
 */
import { DoublyLinkedList } from "@tsplus/stdlib/collections/mutable/DoublyLinkedList";
/**
 * @tsplus global
 */
import { ListBuffer } from "@tsplus/stdlib/collections/mutable/ListBuffer";
/**
 * @tsplus global
 */
import { MutableHashMap } from "@tsplus/stdlib/collections/mutable/MutableHashMap/definition";
/**
 * @tsplus global
 */
import { MutableHashSet } from "@tsplus/stdlib/collections/mutable/MutableHashSet/definition";
/**
 * @tsplus global
 */
import { MutableQueue } from "@tsplus/stdlib/collections/mutable/MutableQueue/definition";
/**
 * @tsplus global
 */
import { ParSeq } from "@tsplus/stdlib/collections/ParSeq/definition";
/**
 * @tsplus global
 */
import { RedBlackTree } from "@tsplus/stdlib/collections/RedBlackTree/definition";
/**
 * @tsplus global
 */
import { SortedMap } from "@tsplus/stdlib/collections/SortedMap/definition";
/**
 * @tsplus global
 */
import { SortedSet } from "@tsplus/stdlib/collections/SortedSet/definition";
/**
 * @tsplus global
 */
import { IterableWeakMap } from "@tsplus/stdlib/collections/weak/IterableWeakMap";
/**
 * @tsplus global
 */
import { AtomicBoolean } from "@tsplus/stdlib/data/AtomicBoolean";
/**
 * @tsplus global
 */
import { AtomicNumber } from "@tsplus/stdlib/data/AtomicNumber";
/**
 * @tsplus global
 */
import { AtomicReference } from "@tsplus/stdlib/data/AtomicReference";
/**
 * @tsplus global
 */
import { Case } from "@tsplus/stdlib/data/Case";
/**
 * @tsplus global
 */
import { Duration } from "@tsplus/stdlib/data/Duration";
/**
 * @tsplus global
 */
import { Either } from "@tsplus/stdlib/data/Either/definition";
/**
 * @tsplus global
 */
import { identity, LazyArg, pipe, Refinement, unsafeCoerce } from "@tsplus/stdlib/data/Function";
/**
 * @tsplus global
 */
import { Option } from "@tsplus/stdlib/data/Option/definition";
/**
 * @tsplus global
 */
import { Predicate } from "@tsplus/stdlib/data/Predicate";
/**
 * @tsplus global
 */
import { Service } from "@tsplus/stdlib/data/Service";
/**
 * @tsplus global
 */
import { Stack } from "@tsplus/stdlib/data/Stack";
/**
 * @tsplus global
 */
import { Tuple } from "@tsplus/stdlib/data/Tuple/definition";
/**
 * @tsplus global
 */
import { IndexOutOfBounds, NoSuchElement } from "@tsplus/stdlib/exceptions";
/**
 * @tsplus global
 */
import { Exception } from "@tsplus/stdlib/exceptions/Exception";
/**
 * @tsplus global
 */
import { Eval } from "@tsplus/stdlib/io/Eval/definition";
/**
 * @tsplus global
 */
import { Associative } from "@tsplus/stdlib/prelude/Associative";
/**
 * @tsplus global
 */
import { AssociativeIdentity } from "@tsplus/stdlib/prelude/AssociativeIdentity";
/**
 * @tsplus global
 */
import { Closure } from "@tsplus/stdlib/prelude/Closure";
/**
 * @tsplus global
 */
import { Equivalence } from "@tsplus/stdlib/prelude/Equivalence/definition";
/**
 * @tsplus global
 */
import { instance } from "@tsplus/stdlib/prelude/Instance";
/**
 * @tsplus global
 */
import { Ord } from "@tsplus/stdlib/prelude/Ord/definition";
/**
 * @tsplus global
 */
import { Ordering } from "@tsplus/stdlib/prelude/Ordering/definition";
/**
 * @tsplus global
 */
import { Copy } from "@tsplus/stdlib/structure/Copy";
/**
 * @tsplus global
 */
import { Equals } from "@tsplus/stdlib/structure/Equals";
/**
 * @tsplus global
 */
import { Hash } from "@tsplus/stdlib/structure/Hash";
/**
 * @tsplus global
 */
import { Check, TypeLevel } from "@tsplus/stdlib/type-level";
/**
 * @tsplus global
 */
import { isDefined, isIterable, isPlainObject, isPromiseLike, isReactElement } from "@tsplus/stdlib/utilities/Guards";
/**
 * @tsplus global
 */
import { lazy } from "@tsplus/stdlib/utilities/Lazy";
/**
 * @tsplus global
 */
import { RandomPCG } from "@tsplus/stdlib/utilities/RandomPCG";
/**
 * @tsplus global
 */
import {
  EnforceNonEmptyRecord,
  Erase,
  ESArray,
  ESIterable,
  ESReadonlyArray,
  ForcedArray,
  ForcedTuple,
  IsInt,
  MergeRecord,
  OrElse,
  PredicateWithIndex,
  RefinementWithIndex,
  Spreadable,
  UnionToIntersection
} from "@tsplus/stdlib/utilities/Types";
