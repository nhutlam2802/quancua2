// Người thực hiện: Phạm Phước Hưng - MSSV: B2405506
function kiemTraDangNhap() {
    let taiKhoan = document.getElementById("login-id").value;
    let matKhauNhapVao = document.getElementById("login-pass").value;

    let oTaiKhoan = document.getElementById("login-id");
    let oMatKhau = document.getElementById("login-pass");
    let thongBaoLoi = document.getElementById("loi-dang-nhap");

    // Dọn dẹp lỗi cũ trước mỗi lần bấm nút
    oTaiKhoan.classList.remove("input-error");
    oMatKhau.classList.remove("input-error");
    thongBaoLoi.style.display = "none";
    thongBaoLoi.style.setProperty("color", "#d23f31", "important"); 

    // 1. Kiểm tra để trống
    if (taiKhoan === "" || matKhauNhapVao === "") {
        if (taiKhoan === "") oTaiKhoan.classList.add("input-error");
        if (matKhauNhapVao === "") oMatKhau.classList.add("input-error");
        
        thongBaoLoi.textContent = 'Vui lòng điền đầy đủ thông tin!';
        thongBaoLoi.style.display = "block";
        return; 
    }

    // 2. Chuẩn hóa đầu số: Nếu người dùng nhập +84 ở ô đăng nhập, tự động đổi thành số 0 để khớp với kho
    if (taiKhoan.startsWith("+84")) {
        taiKhoan = "0" + taiKhoan.slice(3);
    }

    // 3. Kiểm tra định dạng (Phải là Số điện thoại bắt đầu bằng 0 đủ 10 số HOẶC Email hợp lệ)
    let laSoDienThoai = /^(0|\+84)[3-9]\d{8}$/.test(taiKhoan);
    let laEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(taiKhoan);

    // Nếu KHÔNG phải số điện thoại hợp lệ VÀ KHÔNG phải email hợp lệ -> Báo lỗi
    if (!laSoDienThoai && !laEmail) {
        oTaiKhoan.classList.add("input-error");
        thongBaoLoi.textContent = "Tài khoản phải là Số điện thoại (0... hoặc +84...) hoặc Email hợp lệ!";
        thongBaoLoi.style.display = "block";
        return;
    }

    // 4. Lấy dữ liệu từ trong kho ra
    let duLieuTrongKho = localStorage.getItem(taiKhoan);

    // 5. Kiểm tra xem tài khoản đã tồn tại trong kho chưa
    if (duLieuTrongKho === null) {
        alert("Chưa có tài khoản, hãy đăng ký tài khoản!");
        window.location.href = "dangki.html";
        return; 
    }
    
    let matKhauTrongKho = "";
    try {
        let userObj = JSON.parse(duLieuTrongKho);
        matKhauTrongKho = userObj.matKhau; 
    } catch (error) {
        matKhauTrongKho = duLieuTrongKho; 
    }
    
    // 6. Kiểm tra xem mật khẩu nhập vào có khớp với kho không
    if (matKhauTrongKho === matKhauNhapVao) {
        localStorage.setItem("userLogin", duLieuTrongKho);
        thongBaoLoi.style.setProperty("color", "#27ae60", "important");
        thongBaoLoi.textContent = "Đăng nhập thành công!";
        thongBaoLoi.style.display = "block";

        setTimeout(function() {
            window.location.href = "trangchu.html";
        }, 500);

    } else {
        // Thất bại: Mật khẩu sai
        oTaiKhoan.classList.add("input-error");
        oMatKhau.classList.add("input-error");
        
        thongBaoLoi.textContent = 'Sai tài khoản hoặc mật khẩu!';
        thongBaoLoi.style.display = "block";
    }
}

// Hiện/Ẩn mât khẩu
document.querySelectorAll(".toggle-pass").forEach(button => {

    button.addEventListener("click", function () {

        const input = this.previousElementSibling;
        const icon = this.querySelector("i");

        if (input.type === "password") {
            input.type = "text";
            icon.classList.replace("fa-eye-slash", "fa-eye");
        } 
        else {
            input.type = "password";
            icon.classList.replace("fa-eye", "fa-eye-slash");
        }

    });

});