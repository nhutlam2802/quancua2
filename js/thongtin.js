// Người thực hiện: Lâm Quang Nhứt - MSSV: B2408870

// Lấy thông tin tài khoản đăng nhập
let user = JSON.parse(localStorage.getItem("userLogin"));

// Nếu chưa đăng nhập thì quay về trang đăng nhập
if(user == null) {
    window.location.href = "dangnhap.html";
}

// Hiển thị thông tin người dùng
document.getElementById("info-name").value = user.hoTen;
document.getElementById("info-phone").value = user.soDienThoai;
document.getElementById("info-email").value = user.email || "Chưa cập nhật";
document.getElementById("info-pass").value = user.matKhau;

// Hiện / ẩn mật khẩu
const btnToggle = document.getElementById("toggle-pass");
const icon = btnToggle.querySelector("i");

btnToggle.addEventListener("click", function () {
    let input = document.getElementById("info-pass");
    if(input.type == "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    }
    else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
});

// Đổi mật khẩu
function doiMatKhau(){

    let newPass = document.getElementById("new-pass");
    let confirmPass = document.getElementById("new-pass2");

    let msg = document.getElementById("doi-pass-msg");

    msg.style.color = "#d23f31";
    msg.textContent = "";
    
    // Kiểm tra đầy đủ
    if(newPass.value == "" || confirmPass.value == ""){
        msg.textContent ="Vui lòng nhập đầy đủ.";
        return;
    }

    // Kiểm tra trùng khớp
    if(newPass.value != confirmPass.value){
        msg.textContent ="Hai mật khẩu không khớp.";
        // Xóa các ô nhập
        newPass.value = "";
        confirmPass.value = "";
        return;
    }

    // Cập nhật mật khẩu
    user.matKhau = newPass.value;

    // Lưu lại theo số điện thoại
    localStorage.setItem(user.soDienThoai, JSON.stringify(user));
    
    // Nếu có email thì cập nhật luôn
    if(user.email != "") {
        localStorage.setItem(user.email, JSON.stringify(user));
    }

    // Cập nhật tài khoản đang đăng nhập
    localStorage.setItem("userLogin", JSON.stringify(user));

    // Cập nhật ngay ô hiển thị mật khẩu
    document.getElementById("info-pass").value = user.matKhau;

    // Xóa các ô nhập
    newPass.value = "";
    confirmPass.value = "";

    msg.style.color="#27ae60";
    msg.textContent ="Đổi mật khẩu thành công!";
}

document.getElementById("btn-change-pass").addEventListener("click", doiMatKhau);
