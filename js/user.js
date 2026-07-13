function hienThiNguoiDung() {

    let user = JSON.parse(localStorage.getItem("userLogin"));

    let userArea = document.getElementById("user-area");

    if (!userArea) return;

    if (user) {

        userArea.innerHTML = `
            <a href="thongtin.html" id="user-info">
                <i class="fa-solid fa-user"></i>
                ${user.hoTen}
            </a>

            <span>|</span>

            <a href="#" id="logout-btn">
                <i class="fa-solid fa-right-from-bracket"></i>
                Đăng xuất
            </a>
        `;

        document.getElementById("logout-btn").onclick = function(e){
            e.preventDefault();
            localStorage.removeItem("userLogin");
            location.reload();
        };
    }
}