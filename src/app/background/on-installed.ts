import { COPY_WITH_COPY_SCANNER_CONTEXT_MENU_ID } from "@/constants";

const onInstalled = () => {
    // Clean up all stale context menu items
    chrome.contextMenus.removeAll(() => {
        // Register a new context menu item
        chrome.contextMenus.create({
            id: COPY_WITH_COPY_SCANNER_CONTEXT_MENU_ID,
            type: "normal",
            title: "Copy with CopyScanner",
            contexts: ["selection"],
            visible: true,
            enabled: true,
        });
    });
};

export default onInstalled;