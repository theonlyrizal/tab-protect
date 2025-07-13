# 🔒 Tab Protector Extension

A lightweight Chrome extension that prevents accidental tab closure or refresh by toggling a `beforeunload` warning on demand.

> 💡 Made by [@theonlyrizal](https://github.com/theonlyrizal)

---

## 🧠 Features

- Warns you before closing or refreshing a tab
- Click the extension icon to toggle protection ON or OFF
- Clean, fast, and does not track or store any data

---

## 📦 How to Install in Chrome

### 1. **Download the Extension**

- Go to [this repo](https://github.com/theonlyrizal/tab-protect)
- Click the green **Code** button → **Download ZIP**
- Extract the ZIP to a folder on your computer

### 2. **Load as Unpacked Extension**

- Open Chrome and go to: `chrome://extensions/`
- Toggle ON **Developer mode** (top-right corner)
- Click **Load unpacked**
- Select the folder you just extracted

The extension will now appear in your browser’s toolbar.

---

## ✅ How to Use

1. Click the Tab Protector icon on the toolbar
2. A popup will appear with a "Toggle Protection" button
3. Click it to:
   - ✅ Enable: Adds a `beforeunload` warning to the current tab
   - ❌ Disable: Removes the protection (where possible)

You’ll now get a browser warning if you try to close or refresh the tab when protection is ON.

---

## ⚠️ Notes

- Due to browser security limitations, not all pages allow `beforeunload` scripts (e.g., Chrome Web Store, internal pages)
- Removing the event listener cleanly is limited unless the page is reloaded
- No data is collected or stored — it's 100% local and secure

---

## 🛠️ For Developers

Want to clone and tweak it?

```bash
git clone https://github.com/theonlyrizal/tab-protect.git
cd tab-protect
# Make your changes and reload via chrome://extensions
