(function () {
  const storageKey = "aa-theme";
  const root = document.documentElement;

  const applyTheme = (theme) => {
    const resolvedTheme = theme === "dark" ? "dark" : "light";
    root.setAttribute("data-theme", resolvedTheme);
    localStorage.setItem(storageKey, resolvedTheme);
  };

  const storedTheme = localStorage.getItem(storageKey);
  if (storedTheme) {
    applyTheme(storedTheme);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  window.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("theme-btn");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
      const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  });
})();
