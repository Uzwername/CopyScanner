import { browser } from "webextension-polyfill-ts";
// locals
import getActiveTab from "@/app/background/get-active-tab/get-active-tab";
// types
import { SendMessageToContentScript } from "@/app/background/send-message-to-content-script/send-message-to-content-script.types";

const sendMessageToContentScript: SendMessageToContentScript = async (message) => {
  
  const maybeActiveTab = await getActiveTab();
  
  if (!maybeActiveTab?.id) {
    /**
     * @TODO Find out whether, when & why this might fail
     */
    throw new Error("Active tab is unreachable.");
  }
  
  return browser.tabs.sendMessage(maybeActiveTab.id, message);
};

export default sendMessageToContentScript;