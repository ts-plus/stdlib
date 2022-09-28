console.log(ImmutableArray.from(List(0, 1, 2)) == ImmutableArray(0, 1, 2))
console.log(ImmutableArray.from([0, 1, 2]) == ImmutableArray(0, 1, 2))
console.log(
  pipe(
    Maybe(0),
    Maybe.$.map((n) => n + 1),
    Maybe.$.map((n) => `res: ${n}`)
  ) == Maybe("res: 1")
)
console.log(List(0, 1, 2) == 0 + (1 + List(2)))
console.log(List(0, 1, 2) == List(0, 1) + 2)
