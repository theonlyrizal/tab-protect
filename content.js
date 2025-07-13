// Add beforeunload listener to warn user before closing/refreshing
window.onbeforeunload = function (e) {
  e.preventDefault();
  e.returnValue = '';
};
