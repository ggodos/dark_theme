function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true,
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == "string", "tab.url should be a string");

    callback(url);
  });
}

function getCurrentTabId(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true,
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];
    var id = tab.id;
    console.assert(typeof id == "number", "tab.id should be a number");

    callback(id);
  });
}
