import Immutable from "immutable";

export const GET_SELECTED_TEXT = "get-selected-text";

// Ideally, this should be frozen since it's not intended to be modified during runtime
export const MESSAGE_TYPES = Immutable.Set([
  GET_SELECTED_TEXT,
]);