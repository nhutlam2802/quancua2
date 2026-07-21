function kiemTraDangNhap() {
    let soDienThoai = document.getElementById("login-id").value;
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
    if (soDienThoai === "" || matKhauNhapVao === "") {
        if (soDienThoai === "") oTaiKhoan.classList.add("input-error");
        if (matKhauNhapVao === "") oMatKhau.classList.add("input-error");
        
        // Gán trực tiếp đoạn chữ cảnh báo
        thongBaoLoi.textContent = 'Vui lòng điền đầy đủ thông tin!';
        thongBaoLoi.style.display = "block";
        return; 
    }

    // 2. Lấy mật khẩu từ trong kho ra (dựa vào số điện thoại)
    let matKhauTrongKho = localStorage.getItem(soDienThoai);

    // ===============================================================
    // 3. THÊM MỚI: Kiểm tra xem tài khoản đã tồn tại trong kho chưa
    if (matKhauTrongKho === null) {
        // Hiện hộp thoại báo lỗi (Hệ thống sẽ đứng đợi ở đây)
        alert("Chưa có tài khoản, hãy đăng ký tài khoản!");
        
        window.location.href = "dangki.html";
        return; 
    }
    // ===============================================================

    // 4. Kiểm tra xem mật khẩu nhập vào có khớp với kho không
    if (matKhauTrongKho === matKhauNhapVao) {
        // Thành công: Chữ xanh và tự động chuyển trang
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
        
        // Gán trực tiếp đoạn chữ cảnh báo
        thongBaoLoi.textContent = 'Sai số điện thoại hoặc mật khẩu!';
        thongBaoLoi.style.display = "block";
    } 
}
