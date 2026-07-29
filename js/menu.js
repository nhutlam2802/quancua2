// Người thực hiện: Lâm Quang Nhứt - MSSV: B2408870

// Khởi tạo chức năng đóng/mở Menu trên Mobile và Ipad
export function initMenu() {
    const menuBtn = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".page-header__navbar");

    if (!menuBtn || !navbar) return;

    menuBtn.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });
}