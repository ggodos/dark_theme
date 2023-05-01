Object.entries(WEBSITES_CONFIG).forEach(async ([websiteName, config]) => {
  // добавить спискок тем в документ для текущего сайта
  const { url, allStyles } = config;
  const styleFile = { value: null };
  const styleStorageKey = `${websiteName}-style`;
  await chrome.storage.sync.get(styleStorageKey, (data) => {
    styleFile.value = data[styleStorageKey];
  });
  getCurrentTabUrl((currentUrl) => {
    if (!currentUrl.startsWith(url)) {
      return;
    }

    const themeList = document.getElementById("theme-list");
    allStyles.forEach((styleObj) => {
      const { name, value } = styleObj;
      const option = document.createElement("option");
      option.value = value;
      option.text = name;
      if (styleObj.value == styleFile.value) {
        option.selected = true;
      }
      themeList.appendChild(option);
    });

    // добавить обработчик события на изменение темы
    themeList.addEventListener("change", (event) => {
      const style = event.target.value;
      chrome.storage.sync.set({ [styleStorageKey]: style });
    });
  });
});
