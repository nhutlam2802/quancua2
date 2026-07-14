let user = JSON.parse(localStorage.getItem("userLogin"));

if(user == null){
    window.location.href = "dangnhap.html";
}

document.getElementById("info-name").value = user.hoTen;
document.getElementById("info-phone").value = user.soDienThoai;
document.getElementById("info-email").value = user.email || "Chưa cập nhật";
document.getElementById("info-pass").value = user.matKhau;

// Hiện / ẩn mật khẩu
document.getElementById("toggle-pass").onclick = function(){

    let input = document.getElementById("info-pass");

    if(input.type == "password"){
        input.type = "text";
        this.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    }else{
        input.type = "password";
        this.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }

}

// Đổi mật khẩu
function doiMatKhau(){

    let mk1 = document.getElementById("new-pass").value;
    let mk2 = document.getElementById("new-pass2").value;

    let msg = document.getElementById("doi-pass-msg");

    if(mk1 == "" || mk2 == ""){
        msg.innerHTML="Vui lòng nhập đầy đủ.";
        return;
    }

    if(mk1 != mk2){
        msg.innerHTML="Hai mật khẩu không khớp.";
        return;
    }

    user.matKhau = mk1;

    localStorage.setItem(user.soDienThoai,JSON.stringify(user));
    localStorage.setItem("userLogin",JSON.stringify(user));

    msg.style.color="#27ae60";
    msg.innerHTML="Đổi mật khẩu thành công!";
}