import { append_, concat_, prependOperator } from "@tsplus/stdlib/collections/Collection/functions";

/**
 * Concats iterators together that are strictly of the same type
 *
 * @tsplus operator Collection +
 */
export const concatOperator: <A>(self: Collection<A>, that: Collection<A>) => Collection<A> = concat_;

/**
 * Appends a value to an iterator of the same type
 *
 * @tsplus operator Collection + 1.0
 */
export const appendOperatorStrict: <A>(self: Collection<A>, a: A) => Collection<A> = append_;

/**
 * Prepends a value to an iterator of the same type
 *
 * @tsplus operator Collection + 1.0
 */
export const prependOperatorStrict: <A>(a: A, self: Collection<A>) => Collection<A> = prependOperator;
