/*chức năng hienThiGioHang: Đọc dữ liệu giỏ hàng từ localStorage.
                            Gộp các sản phẩm cùng loại và cùng size.
                            Hiển thị danh sách sản phẩm lên trang.
                            Tính tổng tiền.
                            Gán sự kiện cho các nút tăng, giảm, xóa.
                            Nếu giỏ hàng rỗng thì hiển thị thông báo.*/

function hienThiGioHang() {
    /*Đọc dữ liệu giỏ hàng từ localStorage. Nếu không có thì tạo mảng rỗng.*/
    let user = JSON.parse(localStorage.getItem("userLogin"));
    let cartKey = "cart_" + user.soDienThoai;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    /*Gộp các sản phẩm cùng loại và cùng size. Nếu đã tồn tại thì cộng dồn số lượng.*/
    let newCart = []; /*Tạo mảng mới để lưu các sản phẩm đã gộp.*/
    cart.forEach(item => {
        let index = newCart.findIndex(sp => /*Tìm kiếm sản phẩm cùng loại và cùng size trong mảng mới.*/
            sp.product.id == item.product.id &&
            sp.variant.size == item.variant.size
        );
        if (index != -1) { /*Nếu tìm thấy thì cộng dồn số lượng.*/
            newCart[index].quantity += Number(item.quantity);
        } else {
            newCart.push(item);  /*Nếu không tìm thấy thì thêm sản phẩm vào mảng mới.*/
        }
    }); 
    /*Cập nhật lại giỏ hàng trong localStorage với mảng mới đã gộp.*/
     cart = newCart;
     localStorage.setItem("cartKey", JSON.stringify(cart));
     /*Hiển thị danh sách sản phẩm lên trang.*/
    const cartBody=document.getElementById("cart-body"); /*nơi hiển thị danh sách sản phẩm trong giỏ hàng.*/
    
    cartBody.replaceChildren();
let tongTien = 0;

cart.forEach((item, index) => {
    const thanhTien = item.variant.price * item.quantity;
    tongTien += thanhTien;

    const row = document.createElement("div");
    row.className = "cart-row";

    const ten = document.createElement("div");
    ten.append(item.product.name);
    ten.append(document.createElement("br"));
    const size = document.createElement("small");
    size.textContent = "Size: " + item.variant.size;
    ten.append(size);

    const sl = document.createElement("div");

    const tru = document.createElement("button");
    tru.className = "btn-minus";
    tru.dataset.index = index;
    tru.textContent = "-";

    const soLuong = document.createElement("span");
    soLuong.className = "sl";
    soLuong.textContent = item.quantity;

    const cong = document.createElement("button");
    cong.className = "btn-plus";
    cong.dataset.index = index;
    cong.textContent = "+";

    sl.append(tru, soLuong, cong);

    const gia = document.createElement("div");
    gia.textContent = item.variant.price.toLocaleString("vi-VN") + "đ";

    const tt = document.createElement("div");
    tt.className = "thanhtien";
    tt.textContent = thanhTien.toLocaleString("vi-VN") + "đ";

    const xoa = document.createElement("div");
    const nutXoa = document.createElement("button");
    nutXoa.className = "btn-delete";
    nutXoa.dataset.index = index;
    nutXoa.textContent = "X";
    xoa.append(nutXoa);

    row.append(ten, sl, gia, tt, xoa);
    cartBody.append(row);
});

document.getElementById("tongtien").textContent =
    tongTien.toLocaleString("vi-VN");
    
   
   
    document.querySelectorAll(".btn-plus").forEach(button => {
        button.addEventListener("click", function () {
            tangSL(Number(this.dataset.index));
        });
    });
    document.querySelectorAll(".btn-minus").forEach(button => {
        button.addEventListener("click", function () {
            giamSL(Number(this.dataset.index));
        });
    });
    document.querySelectorAll(".btn-delete").forEach(button => {
        button.addEventListener("click", function () {
            xoaSP(Number(this.dataset.index));
        });
    });
    if (cart.length === 0) {
        cartBody.replaceChildren();

        const div = document.createElement("div");
        div.className = "empty-cart";

        const icon = document.createElement("i");
        icon.className = "fa-solid fa-cart-shopping";

        const p = document.createElement("p");
        p.textContent = "Bạn chưa có sản phẩm nào trong giỏ hàng.";

        div.append(icon, p);
        cartBody.append(div);
    }
}

function tangSL(index) {
    let user = JSON.parse(localStorage.getItem("userLogin"));
    let cartKey = "cart_" + user.soDienThoai;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    cart[index].quantity++;
    localStorage.setItem(cartKey, JSON.stringify(cart));
    hienThiGioHang();
}

function giamSL(index) {
    let user = JSON.parse(localStorage.getItem("userLogin"));
    let cartKey = "cart_" + user.soDienThoai;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }
    localStorage.setItem(cartKey, JSON.stringify(cart));
    
    hienThiGioHang();
}

function xoaSP(index) {
    if (confirm("Bạn có chắc muốn xóa sản phẩm?")) {
        let user = JSON.parse(localStorage.getItem("userLogin"));
        let cartKey = "cart_" + user.soDienThoai;
        let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
        cart.splice(index, 1);
        localStorage.setItem(cartKey,JSON.stringify(cart));
        hienThiGioHang();
    }
}

function hienFormThanhToan() {
        let modal = document.getElementById("checkout-modal");
        modal.style.display = "flex";
        let user = JSON.parse(localStorage.getItem("userLogin"));

        if(user){
            document.getElementById("hoten").value = user.hoTen;
            document.getElementById("sdt").value = user.soDienThoai;
        }
        let cartKey = "cart_" + user.soDienThoai;
        let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
        let tongSL = 0;
        let tongTien = 0;
        const orderList = document.getElementById("order-list");
        orderList.replaceChildren();

        for (let i = 0; i < cart.length; i++) {
            tongSL += Number(cart[i].quantity);
            tongTien += cart[i].quantity * cart[i].variant.price;

            const p = document.createElement("p");
            p.textContent = cart[i].product.name +
                " (" + cart[i].variant.size + ") x " + cart[i].quantity;

            orderList.append(p);
        }
        document.getElementById("order-quantity").innerText = tongSL;
        document.getElementById("order-total").innerText =
            tongTien.toLocaleString("vi-VN"); 
}



function dongFormThanhToan(){
    document.getElementById("checkout-modal").style.display = "none";
}

function datHang(){
    let user = localStorage.getItem("userLogin");
    if(user === null){
        alert("Vui lòng đăng nhập để đặt hàng!");
        window.location.href = "dangnhap.html";
        return;
    }
    let diaChi = document.getElementById("diachi");
    diaChi.classList.remove("input-error");

    if(diaChi.value.trim() === ""){
        diaChi.classList.add("input-error");
        diaChi.focus();
        return;
    }

    alert("Đặt hàng thành công!");
    let user = JSON.parse(localStorage.getItem("userLogin"));
    let cartKey = "cart_" + user.soDienThoai;
    localStorage.removeItem(cartKey);
    document.getElementById("checkout-modal").style.display = "none";
    hienThiGioHang();
}

window.addEventListener("load", function(){
    hienThiGioHang();
    document.getElementById("back-btn").addEventListener("click", function () {
        window.location.href = "sanpham.html";
    });
    document.getElementById("checkout-btn").addEventListener("click", hienFormThanhToan);
    document.getElementById("close-modal").addEventListener("click", dongFormThanhToan);
    document.getElementById("btn-order").addEventListener("click", datHang);
    document.getElementById("diachi").addEventListener("input", function () {
    this.classList.remove("input-error");
});
});
