describe.concurrent("Case", () => {
  it("equals", () => {
    interface Person extends Case {
      readonly _tag: "Person"
      readonly name: string
    }
    const Person = Case.tagged<Person>("Person")

    const A = Person({ name: "Mike" })
    const B = Person({ name: "Mike" })
    const C = Person({ name: "Foo" })

    assert.isTrue(A == B)
    assert.isFalse(A == C)
  })
  it("copy", () => {
    interface Person extends Case {
      readonly _tag: "Person"
      readonly name: string
      readonly age?: number
    }
    const Person = Case.tagged<Person>("Person")

    const A = Person({ name: "Mike" })
    const B = Person({ name: "Foo", age: 30 }).copy({ name: "Mike" }).copy({ age: void 0 })

    assert.isTrue(A == B)
  })
})
