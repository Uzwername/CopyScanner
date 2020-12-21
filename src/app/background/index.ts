import { REGISTERED_COMMANDS_NAMES } from "@/constants";
import onInstalled from "./on-installed";

/**
 * @TODO
 * 1. Create a function for extracting selected text.
 * 2. Create a function for pasting text into clipboard.
 * 3. Process the text.
 */

// Set-up on extension activation 
chrome.runtime.onInstalled.addListener(onInstalled);

// Context menu event listener
chrome.contextMenus.onClicked.addListener(({ selectionText }) => {
    if (!selectionText) {
        return;
    }
    
    console.log(selectionText);
});

chrome.commands.onCommand.addListener((command) => {
    if (!REGISTERED_COMMANDS_NAMES.has(command)) {
        return;
    }
    
    console.log(command);
});

