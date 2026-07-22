function kiemTraDangKy() {
    // 1. Lấy dữ liệu từ các ô nhập liệu
    let hoTen = document.getElementById("reg-name").value;
    let soDienThoai = document.getElementById("reg-phone").value;
    let email = document.getElementById("reg-email").value; 
    let matKhau = document.getElementById("reg-pass").value;
    let nhapLai = document.getElementById("reg-pass2").value;
    
    // Lấy các phần tử HTML để thêm viền đỏ
    let oHoTen = document.getElementById("reg-name");
    let oDienThoai = document.getElementById("reg-phone");
    let oMatKhau = document.getElementById("reg-pass");
    let oNhapLai = document.getElementById("reg-pass2");
    let thongBaoLoi = document.getElementById("loi-mat-khau");
    
    // Dọn dẹp lỗi cũ trước mỗi lần bấm nút
    oHoTen.classList.remove("input-error");
    oDienThoai.classList.remove("input-error");
    oMatKhau.classList.remove("input-error");
    oNhapLai.classList.remove("input-error");
    thongBaoLoi.style.display = "none";
    thongBaoLoi.style.setProperty("color", "#d23f31", "important");
    
    // 2. Kiểm tra để trống (Bỏ qua email vì ô email không có thuộc tính required)
    if (hoTen === "" || soDienThoai === "" || matKhau === "" || nhapLai === "") {
        if (hoTen === "") oHoTen.classList.add("input-error");
        if (soDienThoai === "") oDienThoai.classList.add("input-error");
        if (matKhau === "") oMatKhau.classList.add("input-error");
        if (nhapLai === "") oNhapLai.classList.add("input-error");
        
        thongBaoLoi.textContent = "Vui lòng điền đầy đủ thông tin bắt buộc!";
        thongBaoLoi.style.display = "block";
    }
    // 3. Kiểm tra mật khẩu không khớp
    else if (matKhau !== nhapLai) {
        oNhapLai.classList.add("input-error"); 
        thongBaoLoi.textContent = "Hai mật khẩu không giống nhau!"; 
        thongBaoLoi.style.display = "block"; 
    }
   else {
        // TẠO OBJECT: Gom tất cả dữ liệu thành một khối
        let thongTinUser = {
            hoTen: hoTen,
            soDienThoai: soDienThoai,
            email: email,
            matKhau: matKhau
        };
        
        // ÉP KIỂU: Biến Object thành chuỗi JSON để lưu được vào kho
        let chuoiJSON = JSON.stringify(thongTinUser);
        
        // LƯU DỮ LIỆU
        localStorage.setItem(soDienThoai, chuoiJSON);
        if (email !== "") {
            localStorage.setItem(email, chuoiJSON);
        }
        
        thongBaoLoi.style.setProperty("color", "#27ae60", "important");
        thongBaoLoi.textContent = "Đăng ký thành công!";
        thongBaoLoi.style.display = "block";
        
        setTimeout(function() {
            window.location.href = "dangnhap.html";
        }, 500);
    }
}
