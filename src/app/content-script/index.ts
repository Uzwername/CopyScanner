import { browser } from "webextension-polyfill-ts";
// locals
import { MESSAGE_TYPES, GET_SELECTED_TEXT } from "@/constants/messages/messages";
import getSelectedText from "@/app/content-script/get-selected-text/get-selected-text";
// types
import { GenericOnMessageListenerCallback } from "@/app/content-script/content-script.types";
import { GenericRequestPayload } from "@/app/content-script/content-script.types";

browser.runtime.onMessage.addListener((request: GenericRequestPayload, sender) => {
  // Stop here if unknown request.type
  if (!MESSAGE_TYPES.has(request.type)) {
    return;
  }
  
  let functionToPerform: GenericOnMessageListenerCallback | null = null;
  if (request.type === GET_SELECTED_TEXT) {
    functionToPerform = getSelectedText;
  }
  
  // Stop here if unknown request.type & we don't know what to do.
  // Theoretically this must never happen, but MESSAGE_TYPES Set
  // could have been modified during runtime.
  if (!functionToPerform) {
    return;
  }
  
  // Run the requested action
  return Promise.resolve(
    functionToPerform({ request, sender })
  );
});
