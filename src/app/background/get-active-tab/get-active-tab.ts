import { browser, Tabs } from "webextension-polyfill-ts";
import { runSafely } from "@/utils/utils";

const getActiveTab = async (): Promise<Tabs.Tab | null> => {
  /**
   * @TODO Find out whether, when & why this might fail
   * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/query#return_value}
   */
  const tabsOrNull = await runSafely(
    browser.tabs.query,
    [{active: true, currentWindow: true}],
  );
  
  return tabsOrNull?.length ? tabsOrNull[0] : null;
};

export default getActiveTab;