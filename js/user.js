// Hiển thị thông tin người dùng sau khi đăng nhập
function hienThiNguoiDung() {
    
    let user = JSON.parse(localStorage.getItem("userLogin"));

    // Lấy vùng hiển thị người dùng
    let userArea = document.getElementById("user-area");
    if(!userArea) return;

    // Nếu chưa đăng nhập thì giữ nguyên top_bar
    if (user == null) return;

    // Xóa nội dung cũ
    userArea.replaceChildren();

    // Link thông tin
    let infoLink = document.createElement("a");
    infoLink.href = "thongtin.html";
    infoLink.id = "user-info";
    
    let userIcon = document.createElement("i");
    userIcon.className = "fa-solid fa-user";

    infoLink.appendChild(userIcon);
    infoLink.append(" " + user.hoTen);

    let separator = document.createElement("span");
    separator.textContent = " | ";

    // Link đăng xuất
    let logoutLink = document.createElement("a");
    logoutLink.href = "#";
    logoutLink.id = "logout-btn";

    let logoutIcon = document.createElement("i");
    logoutIcon.className = "fa-solid fa-right-from-bracket";

    logoutLink.appendChild(logoutIcon);
    logoutLink.append(" Đăng xuất");

    // Thêm vào top
    userArea.appendChild(infoLink);
    userArea.appendChild(separator);
    userArea.appendChild(logoutLink);

    // Xử lý đăng xuất
    logoutLink.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("userLogin");
        window.location.reload();
    });

}