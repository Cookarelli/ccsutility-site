(() => {
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");
  const year = document.querySelector("[data-year]");
  const form = document.querySelector("#lead-form");
  const success = document.querySelector("#lead-success");
  const fallbackEmail = "bryan@ccsutility.com";

  if (year) year.textContent = String(new Date().getFullYear());

  if (toggle && menu) {
    const setExpanded = (expanded) => {
      toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
      menu.classList.toggle("open", expanded);
    };

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      setExpanded(!expanded);
    });

    menu.addEventListener("click", (e) => {
      const link = e.target && e.target.closest("a");
      if (link) setExpanded(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setExpanded(false);
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      const action = form.getAttribute("action") || "";
      const useMailtoFallback = action.startsWith("mailto:") || action.includes("YOUR_ID");
      if (!useMailtoFallback) return;

      e.preventDefault();
      const data = new FormData(form);
      const fields = [
        ["Name", data.get("name")],
        ["Company", data.get("company")],
        ["Email", data.get("email")],
        ["Phone", data.get("phone")],
        ["Service", data.get("service")],
        ["Industry", data.get("industry")],
        ["Project Location", data.get("location")],
        ["Timeline", data.get("timeline")],
        ["Message", data.get("message")],
      ];

      const body = fields
        .filter(([, value]) => (value || "").toString().trim().length)
        .map(([label, value]) => `${label}: ${value}`)
        .join("\n");

      const email = action.startsWith("mailto:") ? action.replace(/^mailto:/, "") : fallbackEmail;
      const mailto = `mailto:${email}?subject=${encodeURIComponent(
        "Quote Request - CCS Utility"
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;
      if (success) success.classList.add("show");
    });
  }
})();
