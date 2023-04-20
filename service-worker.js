importScripts("service-worker-utils.js");

const lateAdded = {};
var ports = {};
function portLateExecutionAdd(portName, fn) {
  if (!lateAdded[portName]) lateAdded[portName] = [];
  lateAdded[portName].push(fn);
}
chrome.runtime.onConnect.addListener(function (port) {
  const name = port.name;
  ports[name] = port;
  if (lateAdded[name] && lateAdded[name].length > 0) {
    lateAdded[name].forEach((fn) => fn());
    lateAdded[name] = [];
  }
});

function sendMessageToPort(portName, message) {
  const port = ports[portName];
  if (!port || port.disconnected) {
    console.log("wait ", portName);
    portLateExecutionAdd(portName, () => sendMessageToPort(portName, message));
    return;
  }

  console.log("send ", portName);
  try {
    port.postMessage(message);
  } catch (e) {
    console.log("wait ", portName);
    portLateExecutionAdd(portName, () => sendMessageToPort(portName, message));
    return;
  }
}

const allCssXhr =
  "https://edu.susu.ru/theme/styles.php/boost_campus/1681646916_1629077831/all";

chrome.webRequest.onCompleted.addListener(
  function (details) {
    if (details.url == allCssXhr) {
      sendMessageToPort("edu-susu", { action: "add-css" });
    }
  },
  { urls: ["<all_urls>"], types: ["stylesheet"] },
  ["responseHeaders"]
);
