/**
 * Returns the first event in this collection of events. If multiple events
 * occur in parallel and before any other events then any of these events
 * may be returned.
 *
 * @tsplus fluent ParSeq first
 */
export function first<A>(self: ParSeq<A>): Option<A> {
  // eslint-disable-next-line no-constant-condition
  while (1) {
    switch (self._tag) {
      case "Single": {
        return Option.some(self.a);
      }
      case "Empty": {
        return Option.none;
      }
      case "Both": {
        self = self.left;
        break;
      }
      case "Then": {
        self = self.left;
        break;
      }
    }
  }
  throw new Error("Bug");
}
