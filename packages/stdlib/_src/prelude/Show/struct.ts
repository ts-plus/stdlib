/**
 * @tsplus static Show/Ops struct
 */
export function struct<O extends Record<string, any>>(
  shows: {
    [K in keyof O]: Show<O[K]>;
  }
): Show<O> {
  return Show((a) => {
    let s = "{";
    for (const k in shows) {
      if (Object.prototype.hasOwnProperty.call(shows, k)) {
        s += ` ${k}: ${shows[k].show(a[k])},`;
      }
    }
    if (s.length > 1) {
      s = s.slice(0, -1) + " ";
    }
    s += "}";
    return s;
  });
}
