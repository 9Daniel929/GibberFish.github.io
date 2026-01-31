const ModMerge = (function () {
  const ENGINE_FILES = [
    "renderer.js",
    "interpreter.js",
    "chaos-mode.js",
    "code-mode.js",
    "sandbox.js"
  ];

  function classifyFiles(modFiles) {
    const overrides = {};
    const extras = {};
    const names = Object.keys(modFiles);
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      const code = modFiles[name] || "";
      if (!code.trim()) continue;
      if (ENGINE_FILES.indexOf(name) !== -1) {
        overrides[name] = code;
      } else {
        extras[name] = code;
      }
    }
    return { overrides, extras };
  }

  function buildHeader(modName) {
    const t = new Date().toISOString();
    return "/* GibberFish Mod Bundle: " + modName + " @ " + t + " */\n";
  }

  function wrapFile(filename, code) {
    return "\n\n/* BEGIN MOD FILE: " + filename + " */\n\n" + code + "\n\n/* END MOD FILE: " + filename + " */\n";
  }

  function mergeModWithEngine(modName, modFiles) {
    const classified = classifyFiles(modFiles);
    let bundle = buildHeader(modName || "Unnamed Mod");
    const overrideNames = Object.keys(classified.overrides);
    for (let i = 0; i < overrideNames.length; i++) {
      const fname = overrideNames[i];
      bundle += wrapFile(fname, classified.overrides[fname]);
    }
    const extraNames = Object.keys(classified.extras);
    for (let j = 0; j < extraNames.length; j++) {
      const fname = extraNames[j];
      bundle += wrapFile(fname, classified.extras[fname]);
    }
    return bundle;
  }

  return {
    mergeModWithEngine
  };
})();
