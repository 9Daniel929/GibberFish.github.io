(function () {
  const fileListEl = document.getElementById("file-list");
  const createFileBtn = document.getElementById("create-file-btn");
  const editor = document.getElementById("editor");
  const modNameInput = document.querySelector(".mod-name-input");
  const publishBtn = document.querySelector(".topbar .btn");

  let currentModName = "";
  let currentFiles = {};
  let currentFile = null;
  let isLoading = false;
  let saveTimer = null;

  function debounceSave() {
    if (saveTimer) {
      clearTimeout(saveTimer);
    }
    saveTimer = setTimeout(function () {
      saveProject();
    }, 200);
  }

  function ensureModName() {
    let name = modNameInput.value.trim();
    if (!name) {
      name = "Untitled Mod";
      modNameInput.value = name;
    }
    currentModName = name;
    return name;
  }

  function loadExistingProject() {
    const name = ensureModName();
    const project = ModStorage.loadProject(name);
    if (project && project.files && Object.keys(project.files).length > 0) {
      currentFiles = project.files;
      currentFile = project.meta && project.meta.currentFile ? project.meta.currentFile : Object.keys(currentFiles)[0];
    } else {
      currentFiles = { "main.js": "" };
      currentFile = "main.js";
    }
    renderFileList();
    loadCurrentFileIntoEditor();
  }

  function saveProject() {
    if (isLoading) return;
    const name = ensureModName();
    if (currentFile) {
      currentFiles[currentFile] = editor.value;
    }
    const meta = { currentFile: currentFile };
    ModStorage.saveProject(name, currentFiles, meta);
  }

  function renderFileList() {
    fileListEl.innerHTML = "";
    const names = Object.keys(currentFiles);
    for (let i = 0; i < names.length; i++) {
      const filename = names[i];
      const item = document.createElement("div");
      item.className = "file-item";
      item.textContent = filename;
      if (filename === currentFile) {
        item.style.background = "#1a2035";
      }
      item.addEventListener("click", function () {
        switchFile(filename);
      });
      fileListEl.appendChild(item);
    }
  }

  function switchFile(filename) {
    if (currentFile) {
      currentFiles[currentFile] = editor.value;
    }
    currentFile = filename;
    loadCurrentFileIntoEditor();
    renderFileList();
    saveProject();
  }

  function loadCurrentFileIntoEditor() {
    isLoading = true;
    editor.value = currentFiles[currentFile] || "";
    isLoading = false;
  }

  function createNewFile() {
    let base = "file";
    let index = 1;
    let candidate = base + index + ".js";
    while (currentFiles[candidate]) {
      index += 1;
      candidate = base + index + ".js";
    }
    currentFiles[candidate] = "";
    currentFile = candidate;
    renderFileList();
    loadCurrentFileIntoEditor();
    saveProject();
  }

  function buildPublishedPayload() {
    const name = ensureModName();
    const user = ModStorage.loadUser();
    const author = user && user.username ? user.username : "Anonymous";
    const meta = {
      name: name,
      author: author
    };
    return {
      name: name,
      author: author,
      files: currentFiles,
      meta: meta
    };
  }

  function publishMod() {
    if (currentFile) {
      currentFiles[currentFile] = editor.value;
    }
    const payload = buildPublishedPayload();
    ModStorage.savePublishedMod(payload.name, payload);
    ModStorage.saveDownloadedMod(payload.name, payload);
    saveProject();
    alert("Mod published: " + payload.name);
  }

  createFileBtn.addEventListener("click", function () {
    createNewFile();
  });

  editor.addEventListener("input", function () {
    if (!currentFile || isLoading) return;
    currentFiles[currentFile] = editor.value;
    debounceSave();
  });

  modNameInput.addEventListener("input", function () {
    debounceSave();
  });

  publishBtn.addEventListener("click", function () {
    publishMod();
  });

  window.addEventListener("load", function () {
    loadExistingProject();
  });
})();
