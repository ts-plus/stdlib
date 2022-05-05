/**
 * @tsplus type Category
 */
export type Category<F extends HKT> = {
  readonly Law: {
    readonly Category: "Category";
  };
  readonly id: <A, E = never>() => HKT.Kind<F, A, E, A>;
} & AssociativeCompose<F>;
