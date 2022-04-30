export interface Closure<A> {
  readonly Law: { readonly Closure: "Closure"; };
  readonly combine: (x: A, y: A) => A;
}
