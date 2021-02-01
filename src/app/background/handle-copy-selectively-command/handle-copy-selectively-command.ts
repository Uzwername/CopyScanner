import { browser } from "webextension-polyfill-ts";
import { GET_SELECTED_TEXT } from "@/constants/messages/messages";
import getActiveTab from "@/app/background/get-active-tab/get-active-tab";
import { GetSelectedTextResponsePayload } from "@/app/content-script/content-script.types";

const handleCopySelectivelyCommand = async (): Promise<void> => {
  // Response could be empty if no text is selected
  let maybeResponse: GetSelectedTextResponsePayload | undefined;
  try {
    const maybeActiveTab = await getActiveTab();
    
    if (!maybeActiveTab?.id) {
      throw new Error("Active tab is unreachable.");
    }
    
    if (!maybeActiveTab.url || new URL(maybeActiveTab.url).protocol === "chrome:") {
      throw new Error("Commands are not allowed on special pages");      
    }
    
    maybeResponse = await browser.tabs.sendMessage(maybeActiveTab.id, { type: GET_SELECTED_TEXT }); 
  } catch (error) {
    // If an error is thrown here, we can't do much, so, let's just examine the error, try to
    // emit the best notification possible to the user & return early.
    const errorMessage = (error?.message || "").toLowerCase();
    
    // We search for substrings rather than trying to match against whole strings because
    // error messages are likely to vary 
    if (errorMessage.includes("could not establish connection")) {
      /**
       * @TODO Emit notification: user needs to reload the page
       */
      /**
       * Most probably, the problem here is that our content script was not injected on the page.
       * 
       * We don't want to reload the page automatically since:
       * 1. Valuable data might be lost (@example form data).
       * 2. We are not 100% sure that reload will solve the problem in every case.
       */
      console.warn("Notification: Please reload the page or use context menu instead.");
    } else if (errorMessage === "commands are not allowed on special pages") {
      /**
       * @TODO This is a special page. Please use context menu instead.
       */
      console.warn("Notification: This is a special page. Please use context menu instead.");
    } else {
      /**
       * @TODO Emit notification: Unknown error happened
       */
      console.error("Notification: Unknown error");
    }
    
    console.log({ errorMessage });
    return;
  }
  
  if (!maybeResponse) {
    /**
     * @TODO Emit notification: selection is empty.
     */
    console.info("Notification: Selection is empty");
    return;
  }
  
  const selectionText = maybeResponse.text;
  
  console.log(selectionText);
};

export default handleCopySelectivelyCommand;