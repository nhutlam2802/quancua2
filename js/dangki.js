
function kiemTraDangKy() {
    let matKhau = document.getElementById("reg-pass").value;
    let nhapLai = document.getElementById("reg-pass2").value;
    let oNhapLai = document.getElementById("reg-pass2");
    let thongBaoLoi = document.getElementById("loi-mat-khau");
    oNhapLai.classList.remove("input-error");
    thongBaoLoi.style.display = "none";
    if (matKhau === "") {
        alert("Vui lòng nhập mật khẩu vào ô trên!"); 
    } 
    else if (matKhau !== nhapLai) {
        oNhapLai.classList.add("input-error"); 
        thongBaoLoi.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Hai mật khẩu không giống nhau!';
        thongBaoLoi.style.display = "block"; 
    } 
    else {
        
        thongBaoLoi.style.setProperty("color", "#27ae60", "important");
        thongBaoLoi.innerText = "Đăng ký thành công";
        thongBaoLoi.style.display = "block";
        oNhapLai.classList.remove("input-error");
        setTimeout(function() {
            window.location.href = "dangnhap.html";
        },0.5000);
    }
}