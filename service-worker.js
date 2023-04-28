// инжект css перед открытием страницы
chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.frameId === 0 && details.url.startsWith("https://edu.susu.ru")) {
    chrome.scripting.insertCSS({
      target: { tabId: details.tabId },
      files: ["styles/edu-susu.css"],
    });
  }
});

