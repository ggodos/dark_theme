importScripts("constants.js");
importScripts("utils.js");

function changeSiteStyle(
  tabId,
  websiteName,
  needRemove = { value: false, oldValue: null }
) {
  const storageName = `${websiteName}-style`;
  chrome.storage.sync.get(storageName, (data) => {
    if (data[storageName]) {
      insertCSS(tabId, data[storageName]);
      if (needRemove.value) removeCSS(tabId, needRemove.oldValue);
    }
  });
}

function removeCSS(tabId, style) {
  if (style === "null") return;
  chrome.scripting.removeCSS(
    {
      target: { tabId: tabId },
      files: [style],
    },
    () => {
      console.log("removeCSS: ", style);
    }
  );
}

function insertCSS(tabId, style) {
  if (style === "null") return;
  chrome.scripting.insertCSS({
    target: { tabId: tabId },
    files: [style],
  });
}

// инжект css перед открытием страницы
chrome.webNavigation.onCommitted.addListener((details) => {
  Object.entries(WEBSITES_CONFIG).forEach(([key, value]) => {
    const { url } = value;
    if (details.frameId === 0 && details.url.startsWith(url)) {
      changeSiteStyle(details.tabId, key);
    }
  });
});

chrome.storage.onChanged.addListener(function (changes, areaName) {
  const websiteName = Object.keys(changes)[0].replace("-style", "");
  const { oldValue } = Object.values(changes)[0];

  getCurrentTabId((tabId) => {
    changeSiteStyle(tabId, websiteName, { value: true, oldValue: oldValue });
  });
});
