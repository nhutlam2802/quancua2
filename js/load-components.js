import { initMenu } from "./menu.js";

// Tải nôi dung của một component và chèn vào phần tử tương ứng
async function loadComponent(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  
  // Chuyển chuỗi HTML thành Document
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Lấy phần tử cần chèn
  const container = document.getElementById(id);

  // Xóa nội dung cũ
  container.replaceChildren();

  // Chèn phần tử bằng DOM
  while(doc.body.firstChild) {
    container.appendChild(doc.body.firstChild);
  }
}

// Tải các component của trang và khởi tạo chức năng
async function initComponents() {
    await Promise.all([
        loadComponent("top", "/components/top.html"),
        loadComponent("header", "/components/header.html"),
        loadComponent("footer", "/components/footer.html")
    ]);

    // Hiển thị thông tin người dùng sau khi Header được tải
    if (typeof hienThiNguoiDung === "function") {
        hienThiNguoiDung();
    }
    if (typeof capNhatSoLuongGioHang === "function") {
    capNhatSoLuongGioHang();
}
    // Khởi tạo Menu
    initMenu();
}

// Khởi tạo các component
initComponents();
