export function initMenu() {
    const menuBtn = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".page-header__navbar");

    if (!menuBtn || !navbar) return;

    menuBtn.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });
}