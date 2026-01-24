document.addEventListener("DOMContentLoaded", () => {
  const urlInput = document.getElementById("url");
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const tagsInput = document.getElementById("tags");
  const saveBtn = document.getElementById("save");
  const statusEl = document.getElementById("status");

  const showStatus = (message, type) => {
    statusEl.textContent = message;
    statusEl.className = type;
    statusEl.style.display = "block";
  };

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (tab) {
      urlInput.value = tab.url || "";
      titleInput.value = tab.title || "";
    }
  });

  saveBtn.addEventListener("click", async () => {
    const url = urlInput.value;
    const title = titleInput.value;
    const description = descriptionInput.value;
    const tags = tagsInput.value
      .split(",")
      .map(t => t.trim())
      .filter(Boolean);

    saveBtn.disabled = true;
    saveBtn.textContent = "Saving...";
    statusEl.style.display = "none";

    try {
      const res = await fetch("http://localhost:5000/api/v1/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ url, title, description, tags })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to save bookmark");
      }

      showStatus("Bookmark saved successfully!", "success");
      saveBtn.textContent = "Saved";
    } catch (err) {
      showStatus(err.message, "error");
      saveBtn.disabled = false;
      saveBtn.textContent = "Save Bookmark";
    }
  });
});
