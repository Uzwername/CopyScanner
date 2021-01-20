import { browser } from "webextension-polyfill-ts";
// locals
import { COMMANDS_NAMES, COPY_SELECTIVELY } from "@/constants/commands/commands";
import handleCopySelectivelyCommand from "@/app/background/handle-copy-selectively-command/handle-copy-selectively-command";
import onInstalled from "./on-installed/on-installed";
// types
import { GenericOnCommandListenerCallback } from "@/app/background/background.types";

/**
 * @TODO
 * 1. Create functions for searching for things inside the copied string
 * 2. Create a function for pasting text into clipboard.
 * 3. Create notifications system & use it on intent to copy (indicating success/fail) (content script will be required)
 * 4. Develop settings page UI
 * 5. Set-up some default values in local storage inside on-install handler, so, the extension can work out of the box
 * 6. Add actual icons
 * 7. Fix meta tags
 */

// Set-up on extension activation 
browser.runtime.onInstalled.addListener(onInstalled);

// Context menu event listener
browser.contextMenus.onClicked.addListener(({ selectionText }) => {
  if (!selectionText) {
    /**
     * @TODO Emit notification: selection is empty.
     */
    console.log("Notification: Selection is empty");
    return;
  }

  console.log(selectionText);
});

browser.commands.onCommand.addListener((command) => {
  // Stop here if unknown command
  if (!COMMANDS_NAMES.has(command)) {
    return;
  }
  
  let functionToPerform: GenericOnCommandListenerCallback | null = null;
  if (command === COPY_SELECTIVELY) {
    functionToPerform = handleCopySelectivelyCommand;
  }
  
  // Stop here if unknown command & we don't know what to do.
  // Theoretically this must never happen, but COMMANDS_NAMES Set
  // could have been modified during runtime.
  if (!functionToPerform) {
    return;
  }
  
  // Run the adequate callback
  functionToPerform();
});