class Member implements Equals {
  constructor(readonly id: string) {}

  [Hash.sym](): number {
    return Hash.string(this.id)
  }

  [Equals.sym](u: unknown): boolean {
    return u instanceof Member && this.id === u.id
  }
}

describe.concurrent("SortedSet", () => {
  it("add", () => {
    const set = SortedSet.empty<Member>(Ord.string.contramap((_) => _.id))
      + new Member("worker_000000")
      + new Member("worker_000001")
      + new Member("worker_000001")
      + new Member("worker_000002")
      + new Member("worker_000001")

    assert.isTrue(
      set.toImmutableArray == ImmutableArray(
        new Member("worker_000000"),
        new Member("worker_000001"),
        new Member("worker_000002")
      )
    )
  })

  it("difference", () => {
    const set1 = SortedSet.empty<Member>(Ord.string.contramap((_) => _.id))
      + new Member("worker_000000")
      + new Member("worker_000001")
      + new Member("worker_000002")

    const set2 = ImmutableArray(
      new Member("worker_000001"),
      new Member("worker_000002"),
      new Member("worker_000003")
    )

    const set3 = ImmutableArray(
      new Member("worker_000000"),
      new Member("worker_000001"),
      new Member("worker_000002")
    )

    assert.isTrue(
      set1.difference(set2).toImmutableArray == ImmutableArray(
        new Member("worker_000000")
      )
    )
    assert.isTrue(
      set1.difference(set3).toImmutableArray == ImmutableArray.empty()
    )
  })

  it("forAll", () => {
    const isWorker = (member: Member) => member.id.indexOf("worker") !== -1
    const isWorker1 = (member: Member) => member.id === "worker_000001"
    const set = SortedSet.empty<Member>(Ord.string.contramap((_) => _.id))
      + new Member("worker_000000")
      + new Member("worker_000001")
      + new Member("worker_000002")

    const result1 = set.forAll(isWorker)
    const result2 = set.forAll(isWorker1)

    assert.isTrue(result1)
    assert.isFalse(result2)
  })

  it("forAny", () => {
    const isWorker1 = (member: Member) => member.id === "worker_000001"
    const isWorker4 = (member: Member) => member.id === "worker_000004"
    const set = SortedSet.empty<Member>(Ord.string.contramap((_) => _.id))
      + new Member("worker_000000")
      + new Member("worker_000001")
      + new Member("worker_000002")

    const result1 = set.forAny(isWorker1)
    const result2 = set.forAny(isWorker4)

    assert.isTrue(result1)
    assert.isFalse(result2)
  })

  it("filter", () => {
    const isWorker1 = (member: Member) => member.id === "worker_000001"
    const set = SortedSet.empty<Member>(Ord.string.contramap((_) => _.id))
      + new Member("worker_000000")
      + new Member("worker_000001")
      + new Member("worker_000002")

    const result = set.filter(isWorker1)

    assert.isTrue(result.toImmutableArray == ImmutableArray(new Member("worker_000001")))
  })

  it("flatMap", () => {
    const set1 = SortedSet.empty<Member>(Ord.string.contramap((_) => _.id))
      + new Member("worker_000000")
      + new Member("worker_000001")
      + new Member("worker_000002")

    const set2 = ImmutableArray(
      new Member("worker_000001"),
      new Member("worker_000002"),
      new Member("worker_000003")
    )

    const result = set1.flatMap(set1.getOrd, (a) => set2 + a)

    assert.isTrue(
      result.toImmutableArray == ImmutableArray(
        new Member("worker_000000"),
        new Member("worker_000001"),
        new Member("worker_000002"),
        new Member("worker_000003")
      )
    )
  })

  it("forEach", () => {
    const set1 = SortedSet.empty<Member>(Ord.string.contramap((_) => _.id))
      + new Member("worker_000000")
      + new Member("worker_000001")
      + new Member("worker_000002")

    const builder = List.builder<string>()

    set1.forEach((member) => {
      builder.append(member.id)
    })

    const result = builder.build()

    assert.isTrue(result == List("worker_000000", "worker_000001", "worker_000002"))
  })

  it("has", () => {
    const set = SortedSet.empty<Member>(Ord.string.contramap((_) => _.id))
      + new Member("worker_000000")
      + new Member("worker_000001")
      + new Member("worker_000002")

    assert.isTrue(set.has(new Member("worker_000000")))
    assert.isFalse(set.has(new Member("worker_000004")))
  })

  it("intersection", () => {
    const set1 = SortedSet.empty<Member>(Ord.string.contramap((_) => _.id))
      + new Member("worker_000000")
      + new Member("worker_000001")
      + new Member("worker_000002")

    const set2 = ImmutableArray(
      new Member("worker_000001"),
      new Member("worker_000002"),
      new Member("worker_000003")
    )

    const set3 = ImmutableArray(
      new Member("worker_000005")
    )

    const result1 = set1.intersection(set2)
    const result2 = set1.intersection(set3)

    assert.isTrue(
      result1.toImmutableArray == ImmutableArray(
        new Member("worker_000001"),
        new Member("worker_000002")
      )
    )
    assert.isTrue(result2 == ImmutableArray.empty())
  })

  it("isSubset", () => {
    const set1 = SortedSet.empty<Member>(Ord.string.contramap((_) => _.id))
      + new Member("worker_000000")
      + new Member("worker_000001")
      + new Member("worker_000002")

    const set2 = SortedSet.empty<Member>(Ord.string.contramap((_) => _.id))
      + new Member("worker_000001")
      + new Member("worker_000002")

    const set3 = SortedSet.empty<Member>(Ord.string.contramap((_) => _.id))
      + new Member("worker_000005")

    assert.isTrue(set2.isSubset(set1))
    assert.isFalse(set3.isSubset(set1))
  })

  it("map", () => {
    const set = SortedSet.empty<Member>(Ord.string.contramap((_) => _.id))
      + new Member("worker_000000")
      + new Member("worker_000001")
      + new Member("worker_000002")

    const result = set.map(Ord.string, (member) => member.id.replace(/_\d+/g, ""))

    assert.isTrue(result.toImmutableArray == ImmutableArray("worker"))
  })

  it("partition", () => {
    const set = SortedSet.empty<Member>(Ord.string.contramap((_) => _.id))
      + new Member("worker_000000")
      + new Member("worker_000001")
      + new Member("worker_000002")
      + new Member("worker_000003")

    const result = set.partition((member) => member.id.endsWith("1") || member.id.endsWith("3"))

    assert.isTrue(
      result[0].toImmutableArray == ImmutableArray(
        new Member("worker_000000"),
        new Member("worker_000002")
      )
    )
    assert.isTrue(
      result[1].toImmutableArray == ImmutableArray(
        new Member("worker_000001"),
        new Member("worker_000003")
      )
    )
  })

  it("remove", () => {
    const set = SortedSet.empty<Member>(Ord.string.contramap((_) => _.id))
      + new Member("worker_000000")
      + new Member("worker_000001")
      + new Member("worker_000002")

    const result = set.remove(new Member("worker_000000"))

    assert.isTrue(
      result.toImmutableArray == ImmutableArray(
        new Member("worker_000001"),
        new Member("worker_000002")
      )
    )
  })

  it("size", () => {
    const set = SortedSet.empty<Member>(Ord.string.contramap((_) => _.id))
      + new Member("worker_000000")
      + new Member("worker_000001")
      + new Member("worker_000002")

    assert.strictEqual(set.size, 3)
  })

  it("toggle", () => {
    const member = new Member("worker_000000")
    let set = SortedSet.empty<Member>(Ord.string.contramap((_) => _.id))
      + new Member("worker_000000")
      + new Member("worker_000001")
      + new Member("worker_000002")

    assert.isTrue(set.has(member))

    set = set.toggle(member)

    assert.isFalse(set.has(member))

    set = set.toggle(member)

    assert.isTrue(set.has(member))
  })

  it("union", () => {
    const set1 = SortedSet.empty<Member>(Ord.string.contramap((_) => _.id))
      + new Member("worker_000000")
      + new Member("worker_000001")
      + new Member("worker_000002")

    const set2 = ImmutableArray(
      new Member("worker_000001"),
      new Member("worker_000002"),
      new Member("worker_000003")
    )

    const set3 = ImmutableArray.empty<Member>()

    const result1 = set1.union(set2)
    const result2 = set1.union(set3)

    assert.isTrue(
      result1.toImmutableArray == ImmutableArray(
        new Member("worker_000000"),
        new Member("worker_000001"),
        new Member("worker_000002"),
        new Member("worker_000003")
      )
    )
    assert.isTrue(result2 == set1)
  })
})
