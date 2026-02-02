(function () {
  function renderPremiumPage() {
    const container = document.getElementById("premium-page");
    if (!container) return;
    container.innerHTML = "";

    const title = document.createElement("h1");
    title.textContent = "PREMIUM MODE";

    const price = document.createElement("div");
    price.className = "premium-price";
    price.textContent = "2.99$ a month";

    const list = document.createElement("ul");
    list.className = "premium-features";

    const features = [
      "Monthly GibberFish Event",
      "Exclusive Chaos Themes",
      "Premium-Only Mods",
      "Premium Creator Link Chat",
      "Early Access Features"
    ];

    for (let i = 0; i < features.length; i++) {
      const li = document.createElement("li");
      li.textContent = features[i];
      list.appendChild(li);
    }

    const subscribe = document.createElement("button");
    subscribe.className = "premium-subscribe-btn";
    subscribe.textContent = "Get Premium";
    subscribe.addEventListener("click", function () {
      const user = GFUserTracking.loadUser();
      if (!user) {
        alert("Sign in first to get Premium.");
        return;
      }
      GFUserTracking.markPremium(user);
      alert("Premium activated for " + (user.username || "you") + ".");
    });

    container.appendChild(title);
    container.appendChild(price);
    container.appendChild(list);
    container.appendChild(subscribe);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderPremiumPage);
  } else {
    renderPremiumPage();
  }
})();
