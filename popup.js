(async () => {
  const toggleBtn = document.getElementById('toggle-btn');

  // Get current active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Load current toggle state from storage (per tab)
  const result = await chrome.storage.local.get(tab.id.toString());
  let isActive = result[tab.id] || false;

  // Update button text accordingly
  toggleBtn.textContent = isActive ? 'Disable Protection' : 'Enable Protection';

  toggleBtn.addEventListener('click', async () => {
    isActive = !isActive;

    // Save toggle state per tab
    await chrome.storage.local.set({ [tab.id]: isActive });

    // Send message to background to update icon and content script
    chrome.runtime.sendMessage({ tabId: tab.id, active: isActive });

    // Update button text immediately
    toggleBtn.textContent = isActive ? 'Disable Protection' : 'Enable Protection';
  });
})();
