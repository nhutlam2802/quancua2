function kiemTraDangKy() {
    let soDienThoai = document.getElementById("reg-phone").value;
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
    thongBaoLoi.style.setProperty("color", "#d23f31", "important"); // Trả lại màu đỏ mặc định
    
    // 1. Kiểm tra để trống
    if (soDienThoai === "" || matKhau === "" || nhapLai === "") {
        // Ai trống thì bôi đỏ người đó
        if (soDienThoai === "") oDienThoai.classList.add("input-error");
        if (matKhau === "") oMatKhau.classList.add("input-error");
        if (nhapLai === "") oNhapLai.classList.add("input-error");
        
        thongBaoLoi.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Vui lòng điền đầy đủ thông tin!';
        thongBaoLoi.style.display = "block";
    } 
    // 2. Kiểm tra mật khẩu không khớp
    else if (matKhau !== nhapLai) {
        oNhapLai.classList.add("input-error"); 
        thongBaoLoi.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Hai mật khẩu không giống nhau!';
        thongBaoLoi.style.display = "block"; 
    } 
    // 3. Kiểm tra xem tài khoản đã tồn tại chưa
    // 3. Kiểm tra số điện thoại đã đăng ký chưa
    else if (localStorage.getItem(soDienThoai) !== null) {
        oDienThoai.classList.add("input-error");
        thongBaoLoi.innerHTML =
            '<i class="fa-solid fa-circle-exclamation"></i> Số điện thoại đã được đăng ký!';
        thongBaoLoi.style.display = "block";
    }

    // 4. Thành công và lưu dữ liệu
    else {
        let hoTen = document.getElementById("reg-name").value;

        let khachHang = {
            hoTen: hoTen,
            soDienThoai: soDienThoai,
            matKhau: matKhau
        };

        localStorage.setItem(soDienThoai, JSON.stringify(khachHang));

    
        
        thongBaoLoi.style.setProperty("color", "#27ae60", "important");
        thongBaoLoi.innerText = "Đăng ký thành công!";
        thongBaoLoi.style.display = "block";
        
        setTimeout(function() {
            window.location.href = "dangnhap.html";
        }, 500);
    }
}
