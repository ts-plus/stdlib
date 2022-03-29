console.log(ImmutableArray.from(List(0, 1, 2)) == ImmutableArray(0, 1, 2));
console.log([0, 1, 2].immutable() == ImmutableArray(0, 1, 2));
console.log(Option(0) == Option(0));

console.log(List(0, 1, 2) == 0 + (1 + List(2)));
console.log(List(0, 1, 2) == List(0, 1) + 2);
