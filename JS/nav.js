// nav.js
const PAGES = [
  "motion-explorations.html",
  "xlsx.html",
  "msk-vdk.html",

  "out-cene.html",

  "copyright24.html",
  "light-install.html",
  "touch.html",
  "web-research-vid.html",

  "skatesho.html",

  "metalist.html",

  // ... добавляешь новые проекты сюда
];

document.addEventListener("DOMContentLoaded", () => {
  const path = location.pathname.split("/").pop() || "index.html";
  const i = PAGES.indexOf(path);
  if (i === -1) return; // страница не из списка — ничего не делаем

  const prev = document.querySelector(".switch a:first-child");
  const next = document.querySelector(".switch a:last-child");

  // По кругу: с последней страницы «назад» ведёт на последнюю,
  // а «вперёд» — на первую. Если круг не нужен — см. ниже.
  prev.href = PAGES[(i - 1 + PAGES.length) % PAGES.length];
  next.href = PAGES[(i + 1) % PAGES.length];
});
