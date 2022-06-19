export type Age = Positive & Int & Finite & Range<0, 250> & Brand<"Age">
export const Age = Derive<Make<Age>>()

export type Name = string & Brand<"Name"> & Regex<`^([A-Z|a-z]*)$`>
export const Name = Derive<Make<Name>>()

export interface Person {
  readonly name: Name
  readonly age: Maybe<Age>
}
export const Person = Derive<Codec<Person>>()

const person = Person.make({
  name: Name.unsafeMake("Mike"),
  age: Maybe.some(Age.unsafeMake(30))
})

const decoded = Person.decodeJSON(Person.encodeJSON(person))

if (decoded.isRight()) {
  console.log(decoded.right.name)
}
