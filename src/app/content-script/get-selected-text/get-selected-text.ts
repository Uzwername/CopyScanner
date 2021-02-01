import { GenericOnMessageListenerCallback } from "@/app/content-script/content-script.types.ts";

const getSelectedText: GenericOnMessageListenerCallback = ({ request }) => {
  const { type } = request;
  const selectedText = (window.getSelection() || "").toString().trim();

  /**
   * all_frames flag (@see https://developer.chrome.com/docs/extensions/mv2/content_scripts/#frames) is
   * set to true while according to docs (@see https://developer.chrome.com/docs/extensions/mv2/messaging/#simple) "If
   * multiple pages are listening for onMessage events, only the first to call `sendResponse()` for a particular event
   * will succeed in sending the response. All other responses to that event will be ignored."
   * 
   * So, a situation when 2 content scripts in 2 different frames (both located in the active tab) try to send
   * a response is perfectly possible. That's why it's our best interest to prevent returning when it's
   * clearly not needed in order not to shadow the response with content if any. 
   */
  if (!selectedText) {
    return;
  }
  
  return {
    type,
    text: selectedText,
  }; 
};

export default getSelectedText;