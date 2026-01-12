// ui/renderer.js
window.GF = window.GF || {};

window.GF.createChaosRenderer = function (outputEl) {
  function addArtifact(artifact) {
    var card = window.GF.renderArtifactCard(artifact);
    outputEl.prepend(card);
  }

  function addLog(message) {
    var card = window.GF.renderLogCard(message);
    outputEl.prepend(card);
  }

  function clear() {
    outputEl.innerHTML = '';
  }

  return { addArtifact: addArtifact, addLog: addLog, clear: clear };
};
