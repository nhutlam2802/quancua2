import { initMenu } from "./menu.js";

async function loadComponent(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

async function initComponents() {
    await Promise.all([
        loadComponent("top", "/components/top.html"),
        loadComponent("header", "/components/header.html"),
        loadComponent("footer", "/components/footer.html")
    ]);

    initMenu();
}

initComponents();
