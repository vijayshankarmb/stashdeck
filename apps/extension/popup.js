document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];

    if (!tab) return;

    document.getElementById("url").value = tab.url || "";
    document.getElementById("title").value = tab.title || "";
  });
});
