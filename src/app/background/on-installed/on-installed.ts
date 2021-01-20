import { browser } from "webextension-polyfill-ts";
// locals
import { COPY_WITH_COPY_SCANNER_CONTEXT_MENU_ID } from "@/constants/context-menus/context-menus";

const onInstalled = async (): Promise<void> => {
  // Clean up all stale context menu items
  await browser.contextMenus.removeAll();
  
  /**
   * @TODO Find out whether, when & why this fails
   */
  // Create a new menu item
  browser.contextMenus.create({
    id: COPY_WITH_COPY_SCANNER_CONTEXT_MENU_ID,
    type: "normal",
    title: "Copy with CopyScanner",
    contexts: ["selection"],
    visible: true,
    enabled: true,
  });
};

export default onInstalled;