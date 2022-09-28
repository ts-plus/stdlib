main()

function main() {
  /* one namespace per module with "aliased" constructor! */
  const map0 = VoteMap(HashMap(["TsPlus", Votes(1)], ["Effect", Votes(2)]))

  /* configure global imports that are still tree-shakeable */
  const map1 = VoteMap(HashMap(["TsPlus", Votes(4)], ["Effect-2", Votes(2)]))

  /* custom binary operators */
  console.assert(map0.sum(map1) == (map0 + map1))

  console.assert(
    /* one object for operations, instances and methods */
    (map0 + map1) == VoteMap.AssociativeSum.combine(map0, map1)
  )
}

type Topic = string
/**
 * @tsplus type Example/Votes
 * @tsplus companion Example/Votes/Ops
 */
export class Votes implements Hash, Equals {
  constructor(readonly value: number) {}
  [Equals.sym](this: this, other: unknown): boolean {
    return Votes.isVote(other) && Equals.equals(this.value, other.value)
  }
  [Hash.sym](this: this): number {
    return Hash.combine(Hash.string("Example/Votes"), Hash.number(this.value))
  }
}

/**
 * @tsplus static Example/Votes/Ops __call
 */
export const makeVotes = (n: number) => new Votes(n)

/**
 * @tsplus static Example/Votes/Ops isVote
 */
export function isVote(t: unknown): t is Votes {
  return typeof t == "object" && t instanceof Votes
}

/**
 * @tsplus fluent Example/Votes zip
 */
export function zip_(self: Votes, that: Votes) {
  return new Votes(self.value + that.value)
}

/**
 * @tsplus static Example/Votes/Ops SumAssociative
 */
export const VotesSumAssociative: Associative<Votes> = Associative(zip_)

type VoteData = HashMap<Topic, Votes>
/**
 * @tsplus type Example/VoteMap
 * @tsplus companion Example/VoteMap.Ops
 */
export class VoteMap implements Hash, Equals {
  constructor(readonly map: VoteData) {}
  [Equals.sym](this: this, other: unknown): boolean {
    return isVoteMap(other) && Equals.equals(this.map, other.map)
  }
  [Hash.sym](this: this): number {
    return Hash.combine(Hash.string("Example/VoteMap"), this.map[Hash.sym]())
  }
}

/**
 * @tsplus static Example/VoteMap.Ops __call
 */
export const makeVoteMap = (map: VoteData) => new VoteMap(map)

/**
 * @tsplus static Example/VoteMap.Ops isVoteMap
 */
export function isVoteMap(t: unknown): t is VoteMap {
  return typeof t === "object" && t instanceof VoteMap
}

/**
 * @tsplus static Example/VoteMap.Ops AssociativeSum
 */
export const VoteMapSumAssociative: Associative<VoteMap> = pipe(
  HashMap.getAssociative<Topic, Votes>(Votes.SumAssociative),
  (A) => Associative((x, y) => new VoteMap(A.combine(x.map, y.map)))
)

/**
 * @tsplus operator Example/VoteMap ==
 * @tsplus fluent Example/VoteMap equals
 */
export function equals(self: VoteMap, other: unknown) {
  return self[Equals.sym](other)
}

/**
 * @tsplus operator Example/VoteMap +
 * @tsplus fluent Example/VoteMap sum
 */
export function sumVoteMaps(self: VoteMap, that: VoteMap) {
  return VoteMapSumAssociative.combine(self, that)
}
