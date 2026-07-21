function kiemTraDangKy() {
    // 1. Lấy dữ liệu từ các ô nhập liệu
    let soDienThoai = document.getElementById("reg-phone").value;
    let email = document.getElementById("reg-email").value; 
    let matKhau = document.getElementById("reg-pass").value;
    let nhapLai = document.getElementById("reg-pass2").value;
    
    // Lấy các phần tử HTML để thêm viền đỏ
    let oDienThoai = document.getElementById("reg-phone");
    let oMatKhau = document.getElementById("reg-pass");
    let oNhapLai = document.getElementById("reg-pass2");
    let thongBaoLoi = document.getElementById("loi-mat-khau");
    
    // Dọn dẹp lỗi cũ trước mỗi lần bấm nút
    oDienThoai.classList.remove("input-error");
    oMatKhau.classList.remove("input-error");
    oNhapLai.classList.remove("input-error");
    thongBaoLoi.style.display = "none";
    thongBaoLoi.style.setProperty("color", "#d23f31", "important"); 
    
    // 2. Kiểm tra để trống (Bỏ qua email vì ô email không có thuộc tính required)
    if (soDienThoai === "" || matKhau === "" || nhapLai === "") {
        // Ai trống thì bôi đỏ người đó
        if (soDienThoai === "") oDienThoai.classList.add("input-error");
        if (matKhau === "") oMatKhau.classList.add("input-error");
        if (nhapLai === "") oNhapLai.classList.add("input-error");
        // Gán trực tiếp đoạn chữ cảnh báo
        thongBaoLoi.textContent = "Vui lòng điền đầy đủ thông tin bắt buộc!";
        thongBaoLoi.style.display = "block";
    } 
    // 3. Kiểm tra mật khẩu không khớp
    else if (matKhau !== nhapLai) {
        oNhapLai.classList.add("input-error"); 
        thongBaoLoi.textContent = "Hai mật khẩu không giống nhau!"; 
        thongBaoLoi.style.display = "block"; 
    } 
    // 4. Thành công và lưu dữ liệu
    else {
        // Lưu tài khoản bằng số điện thoại
        localStorage.setItem(soDienThoai, matKhau);
        //lưu tài khoản bằng email nếu email không rỗng
        if (email !== "") {
            localStorage.setItem(email, matKhau);
        }
        thongBaoLoi.style.setProperty("color", "#27ae60", "important");
        thongBaoLoi.textContent = "Đăng ký thành công!";
        thongBaoLoi.style.display = "block";
        setTimeout(function() {
            window.location.href = "dangnhap.html";
        }, 500);
    }
}
