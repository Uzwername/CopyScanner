import { browser, Tabs } from "webextension-polyfill-ts";

const getActiveTab = async (): Promise<Tabs.Tab | null> => {
  /**
   * @throws This line may throw on its own.
   * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/query#return_value}
   */
  try {
    const [ firstTab ] = await browser.tabs.query({ active: true, currentWindow: true });
    
    return firstTab;
  } catch {
    /**
     * @TODO Find out whether, when & why this might fail
     */
    return null;
  }
};

export default getActiveTab;