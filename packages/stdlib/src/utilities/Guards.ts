export function isDefined<T>(value: T | undefined): value is T {
  return value !== void 0;
}

export function isIterable(value: object): value is Iterable<unknown> {
  return Symbol.iterator in <any> value;
}

export function isPlainObject(value: any) {
  return value.constructor === Object || value.constructor == null;
}

export function isPromiseLike(value: any) {
  return !!value && typeof value.then === "function";
}

export function isReactElement(value: any) {
  return !!(value && value.$$typeof);
}
