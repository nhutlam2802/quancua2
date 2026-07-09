
function kiemTraDangNhap() {
    let taiKhoan = document.getElementById("login-id").value;
    let matKhau = document.getElementById("login-pass").value;

    let oTaiKhoan = document.getElementById("login-id");
    let oMatKhau = document.getElementById("login-pass");
    let thongBaoLoi = document.getElementById("loi-dang-nhap");
    oTaiKhoan.classList.remove("input-error");
    oMatKhau.classList.remove("input-error");
    thongBaoLoi.style.display = "none";
    if (taiKhoan === "" || matKhau === "") {
        if (taiKhoan === "") oTaiKhoan.classList.add("input-error");
        if (matKhau === "") oMatKhau.classList.add("input-error");
        thongBaoLoi.style.setProperty("color", "#d23f31", "important"); // Đảm bảo chữ màu đỏ
        thongBaoLoi.innerText = "Vui lòng nhập đầy đủ tài khoản và mật khẩu!";
        thongBaoLoi.style.display = "block"; 
    } 
    else {
        thongBaoLoi.style.setProperty("color", "#27ae60", "important"); // Chuyển chữ thành xanh lá
        thongBaoLoi.innerText = "Đăng nhập thành công! Đang đưa bạn về trang chủ...";
        thongBaoLoi.style.display = "block";
        setTimeout(function() {
            window.location.href = "trangchu.html";
        }, 0.5000);
    }
}