/*chức năng hienThiGioHang: Đọc dữ liệu giỏ hàng từ localStorage.
                            Gộp các sản phẩm cùng loại và cùng size.
                            Hiển thị danh sách sản phẩm lên trang.
                            Tính tổng tiền.
                            Gán sự kiện cho các nút tăng, giảm, xóa.
                            Nếu giỏ hàng rỗng thì hiển thị thông báo.*/

function hienThiGioHang() {
    /*Đọc dữ liệu giỏ hàng từ localStorage. Nếu không có thì tạo mảng rỗng.*/
    let cart=JSON.parse(localStorage.getItem("cart")) || [];
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
     localStorage.setItem("cart", JSON.stringify(cart));
     /*Hiển thị danh sách sản phẩm lên trang.*/
    const cartBody=document.getElementById("cart-body"); /*nơi hiển thị danh sách sản phẩm trong giỏ hàng.*/
    let html = ""; /*Tạo chuỗi HTML để hiển thị danh sách sản phẩm.*/
    let tongTien = 0; /*Biến để tính tổng tiền.*/
    cart.forEach((item, index) => { /*Duyệt qua từng sản phẩm trong giỏ hàng.*/
        const thanhTien = item.variant.price * item.quantity;/*Tính thành tiền của sản phẩm.*/
        tongTien += thanhTien;
        html += ` 
        <div class="cart-row">
            <div>
                ${item.product.name}
                <br>
                <small>Size: ${item.variant.size}</small>
            </div>
            <div>
                <button class="btn-minus" data-index="${index}">-</button>
                <span class="sl">
                    ${item.quantity}
                </span>
                <button class="btn-plus" data-index="${index}">+</button>
            </div>
            <div>
                ${item.variant.price.toLocaleString("vi-VN")}đ
            </div>
            <div class="thanhtien">
                ${thanhTien.toLocaleString("vi-VN")}đ
            </div>
            <div>
                <button class="btn-delete" data-index="${index}">
                    X
                </button>
            </div>
        </div>
        `;
    });
    cartBody.innerHTML = html;
    document.getElementById("tongtien").innerText =
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

        cartBody.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <p>Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
            </div>
        `;}

}

function tangSL(index) {
    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity++;
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    hienThiGioHang();
}

function giamSL(index) {
    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    hienThiGioHang();
}

function xoaSP(index) {
    if (confirm("Bạn có chắc muốn xóa sản phẩm?")) {
        let cart =
            JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );
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
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let tongSL = 0;
        let tongTien = 0;
        let html = "";
        for(let i = 0; i < cart.length; i++){
            tongSL += Number(cart[i].quantity);
            tongTien += cart[i].quantity * cart[i].variant.price;
            html +=
            "<p>"
            + cart[i].product.name
            + " (" + cart[i].variant.size + ")"
            + " x " + cart[i].quantity
            + "</p>";
        }
        document.getElementById("order-list").innerHTML = html;
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
    localStorage.removeItem("cart");
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

