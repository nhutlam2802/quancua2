function hienThiGioHang() {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const cartBody =
        document.getElementById("cart-body");

    let html = "";
    let tongTien = 0;

    cart.forEach((item, index) => {

        const thanhTien =
            item.variant.price * item.quantity;

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

    document.getElementById("checkout-form").style.display = "block";

    document.getElementById("checkout-form").scrollIntoView({
        behavior: "smooth"
    });

}

function datHang() {

    alert("Đặt hàng thành công!");

    localStorage.removeItem("cart");

    hienThiGioHang();

    document.getElementById("checkout-form").style.display = "none";

}

window.addEventListener("load", function () {

    hienThiGioHang();

    document.getElementById("back-btn").addEventListener("click", function () {

        window.location.href = "sanpham.html";

    });

    document.getElementById("checkout-btn").addEventListener("click", hienFormThanhToan);

    document.getElementById("btn-order").addEventListener("click", datHang);

});
