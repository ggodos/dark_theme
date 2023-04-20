var port = chrome.runtime.connect({ name: "edu-susu" });

function addCssToDocument() {
  var link = document.createElement("link");
  link.href = chrome.runtime.getURL("./styles/edu-susu.css");
  link.type = "text/css";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

port.onMessage.addListener(function (msg) {
  console.log("Message received", msg);
  if (msg.action == "add-css") {
    addCssToDocument();
  }
});
