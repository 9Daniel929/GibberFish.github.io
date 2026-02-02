(function () {
  function isLastSaturday(date) {
    const d = new Date(date.getTime());
    const day = d.getDay();
    if (day !== 6) return false;
    const nextWeek = new Date(d.getTime());
    nextWeek.setDate(d.getDate() + 7);
    return nextWeek.getMonth() !== d.getMonth();
  }

  function isChatActive() {
    const now = new Date();
    return isLastSaturday(now);
  }

  function isValidChannelLink(value) {
    if (!value) return false;
    const trimmed = value.trim();
    if (!trimmed) return false;
    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) return false;
    return true;
  }

  function renderChat() {
    const user = GFUserTracking.loadUser();
    if (!user) return;
    if (!GFUserTracking.isPremium(user)) return;
    if (!isChatActive()) return;

    let existing = document.getElementById("premium-chat-root");
    if (existing) return;

    const root = document.createElement("div");
    root.id = "premium-chat-root";
    root.className = "premium-chat-root";

    const header = document.createElement("div");
    header.className = "premium-chat-header";
    header.textContent = "Premium Creator Chat";

    const sub = document.createElement("div");
    sub.className = "premium-chat-sub";
    sub.textContent = "Share your channel link for this month’s event.";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "https://yourchannel.link";

    const button = document.createElement("button");
    button.className = "premium-chat-submit";
    button.textContent = "Submit Link";

    const list = document.createElement("div");
    list.className = "premium-chat-list";

    button.addEventListener("click", function () {
      const value = input.value;
      if (!isValidChannelLink(value)) {
        alert("Enter a valid channel link starting with http:// or https://");
        return;
      }
      GFUserTracking.savePremiumLinkForCurrentPeriod(user, value.trim());
      renderLinks(list);
      button.disabled = true;
      input.disabled = true;
    });

    root.appendChild(header);
    root.appendChild(sub);
    root.appendChild(input);
    root.appendChild(button);
    root.appendChild(list);

    document.body.appendChild(root);
    renderLinks(list, user);
  }

  function renderLinks(container, currentUser) {
    const links = GFUserTracking.getPremiumLinksForCurrentPeriod();
    const ids = Object.keys(links);
    container.innerHTML = "";
    if (ids.length === 0) {
      const empty = document.createElement("div");
      empty.className = "premium-chat-empty";
      empty.textContent = "No links submitted yet.";
      container.appendChild(empty);
      return;
    }
    for (let i = 0; i < ids.length; i++) {
      const entry = links[ids[i]];
      const row = document.createElement("div");
      row.className = "premium-chat-row";
      const name = document.createElement("span");
      name.className = "premium-chat-name";
      name.textContent = entry.username || "Unknown";
      const link = document.createElement("a");
      link.className = "premium-chat-link";
      link.href = entry.link;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = entry.link;
      row.appendChild(name);
      row.appendChild(link);
      container.appendChild(row);
    }
  }

  function init() {
    renderChat();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
