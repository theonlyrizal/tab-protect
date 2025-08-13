(async () => {
  const toggleBtn = document.getElementById('toggle-btn');

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const result = await chrome.storage.local.get(tab.id.toString());
  let isActive = result[tab.id] || false;

  toggleBtn.textContent = isActive ? 'Disable Protection' : 'Enable Protection';

  toggleBtn.addEventListener('click', async () => {
    isActive = !isActive;
    await chrome.storage.local.set({ [tab.id]: isActive });
    chrome.runtime.sendMessage({ tabId: tab.id, active: isActive });
    toggleBtn.textContent = isActive ? 'Disable Protection' : 'Enable Protection';
  });
})();
