// Người thực hiện: Phạm Phước Hưng - MSSV: B2405506
function kiemTraDangKy() {
    let hoTen = document.getElementById("reg-name").value;
    let soDienThoai = document.getElementById("reg-phone").value;
    
    // --- CHUYỂN ĐỔI ĐẦU SỐ ---
    if (soDienThoai.startsWith("+84")) {
        soDienThoai = "0" + soDienThoai.slice(3);
    }
    // -------------------------
    
    let email = document.getElementById("reg-email").value; 
    let matKhau = document.getElementById("reg-pass").value;
    let nhapLai = document.getElementById("reg-pass2").value;
    
    let oHoTen = document.getElementById("reg-name");
    let oDienThoai = document.getElementById("reg-phone");
    let oEmail = document.getElementById("reg-email");
    let oMatKhau = document.getElementById("reg-pass");
    let oNhapLai = document.getElementById("reg-pass2");
    let thongBaoLoi = document.getElementById("loi-mat-khau");
    
    oHoTen.classList.remove("input-error");
    oDienThoai.classList.remove("input-error");
    oEmail.classList.remove("input-error");
    oMatKhau.classList.remove("input-error");
    oNhapLai.classList.remove("input-error");
    thongBaoLoi.style.display = "none";
    thongBaoLoi.style.setProperty("color", "#d23f31", "important");
    
    // 1. Kiểm tra để trống
    if (hoTen === "" || soDienThoai === "" || matKhau === "" || nhapLai === "") {
        if (hoTen === "") oHoTen.classList.add("input-error");
        if (soDienThoai === "") oDienThoai.classList.add("input-error");
        if (matKhau === "") oMatKhau.classList.add("input-error");
        if (nhapLai === "") oNhapLai.classList.add("input-error");
        
        thongBaoLoi.textContent = "Vui lòng điền đầy đủ thông tin bắt buộc!";
        thongBaoLoi.style.display = "block";
    }
    // 2. Kiểm tra định dạng số điện thoại
    else if (!/^(0|\+84)\d{9}$/.test(soDienThoai)) {
        oDienThoai.classList.add("input-error");
        thongBaoLoi.textContent = "Số điện thoại phải bắt đầu bằng 0 hoặc +84 và gồm đủ 10 số hợp lệ!";
        thongBaoLoi.style.display = "block";
    }
    // 3. Kiểm tra định dạng Email
    else if (email !== "" && !/^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z]{2,}$/.test(email)) {
        oEmail.classList.add("input-error");
        thongBaoLoi.textContent = "Email chỉ được chứa chữ, số, dấu gạch dưới (VD: ten_12@mien_34.com)!";
        thongBaoLoi.style.display = "block";
    }
    // 4. Kiểm tra độ mạnh mật khẩu
    else if (!/^(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(matKhau)) {
        oMatKhau.classList.add("input-error");
        thongBaoLoi.textContent = "Mật khẩu phải từ 8 đến 20 ký tự, gồm cả chữ hoa và chữ thường!";
        thongBaoLoi.style.display = "block";
    }
    // 5. Kiểm tra mật khẩu không khớp
    else if (matKhau !== nhapLai) {
        oNhapLai.classList.add("input-error"); 
        thongBaoLoi.textContent = "Hai mật khẩu không giống nhau!"; 
        thongBaoLoi.style.display = "block"; 
    }
    else {
        let thongTinUser = {
            hoTen: hoTen,
            soDienThoai: soDienThoai,
            email: email,
            matKhau: matKhau
        };
        
        let chuoiJSON = JSON.stringify(thongTinUser);
        
        // Lưu vào localStorage với SĐT đã được chuẩn hóa thành số 0 ở đầu
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