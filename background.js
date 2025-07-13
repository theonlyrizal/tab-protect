// Keep track of state per tab (fallback in memory)
const tabStates = {};

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  const { tabId, active } = message;
  tabStates[tabId] = active;

  // Update icon per tab
  chrome.action.setIcon({
    path: active ? 'icon-on.png' : 'icon-off.png',
    tabId: tabId,
  });

  if (active) {
    // Inject content script that adds beforeunload listener
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content.js'],
      });
    } catch (e) {
      console.error('Failed to inject content script:', e);
    }
  } else {
    // Inject a script to remove listener by reloading the page
    // (Because beforeunload listeners can't be cleanly removed)
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
          // Remove beforeunload listener by reloading the tab silently
          // Alternatively, you can just alert user to reload
          window.onbeforeunload = null;
        },
      });
    } catch (e) {
      console.error('Failed to remove beforeunload listener:', e);
    }
  }
});

// Optional: Clean up state when tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabStates[tabId];
  chrome.storage.local.remove(tabId.toString());
});
