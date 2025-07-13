if (!window.__tab_protector_active) {
  window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
  });
  window.__tab_protector_active = true;
  alert("Tab protection ON");
} else {
  // Remove all beforeunload listeners (trick: reload handler)
  const clone = window.addEventListener;
  window.removeEventListener('beforeunload', function (e) {});
  window.__tab_protector_active = false;
  alert("Tab protection OFF (might need reload to fully remove)");
}
