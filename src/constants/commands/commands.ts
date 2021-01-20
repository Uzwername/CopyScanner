import Immutable from "immutable";

export const COPY_SELECTIVELY = "copy-selectively";

// Ideally, this should be frozen since it's not intended to be modified during runtime
export const COMMANDS_NAMES = Immutable.Set([
  COPY_SELECTIVELY,
]);