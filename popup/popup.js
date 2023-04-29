console.log("POPUP");
chrome.runtime.sendMessage({
  action: "updateVariable",
  name: "myVariable",
  value: "new value",
});
