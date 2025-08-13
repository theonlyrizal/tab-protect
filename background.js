
const tabStates = {};

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  const { tabId, active } = message;
  tabStates[tabId] = active;

  chrome.action.setIcon({
    path: active ? 'icon-on.png' : 'icon-off.png',
    tabId: tabId,
  });

  if (active) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content.js'],
      });
    } catch (e) {
      console.error('Failed to inject content script:', e);
    }
  } else {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
          window.onbeforeunload = null;
        },
      });
    } catch (e) {
      console.error('Failed to remove beforeunload listener:', e);
    }
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabStates[tabId];
  chrome.storage.local.remove(tabId.toString());
});
