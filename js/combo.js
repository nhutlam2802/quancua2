import { list_product_combo } from "./listproductcombo.js";
import { Item } from "./sanpham/sanpham.js";

const input = document.querySelector(".product-detail__count-input");
const plus = document.getElementById("sum");
const minus = document.getElementById("minus");
const add = document.getElementById("add-cart");
const buy = document.getElementById("buy");

input.value = 1;

// Lấy id sản phẩm
const id = Number(add.dataset.id);

// Tìm sản phẩm
const product = list_product_combo.find(item => item.id == id);

// Kiểm tra sản phẩm đã có trong giỏ chưa
function isExistedInCart(item, cartItemArr) {
    for (let i = 0; i < cartItemArr.length; i++) {
        if (
            cartItemArr[i].product.id == item.product.id &&
            cartItemArr[i].variant.size == item.variant.size
        ) {
            return i;
        }
    }
    return -1;
}

// Tăng số lượng
plus.addEventListener("click", function () {
    input.value++;
});

// Giảm số lượng
minus.addEventListener("click", function () {
    if (input.value > 1) {
        input.value--;
    }
});

// Hàm thêm vào giỏ
function addToCart() {

    let user = JSON.parse(localStorage.getItem("userLogin"));

    // Chưa đăng nhập
    if (!user) {
        alert("Vui lòng đăng nhập trước khi mua hàng!");
        window.location.href = "dangnhap.html";
        return false;
    }

    let cartKey = "cart_" + user.soDienThoai;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const item = new Item(
        product,
        product.variant[0],
        Number(input.value)
    );

    const index = isExistedInCart(item, cart);

    if (index >= 0) {
        cart[index].quantity += Number(input.value);
    } else {
        cart.push(item);
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));

    return true;
}

// Nút thêm vào giỏ hàng
add.addEventListener("click", function () {
    if (addToCart()) {
        alert("Đã thêm vào giỏ hàng!");
    }
});

// Nút mua ngay
buy.addEventListener("click", function () {
    if (addToCart()) {
        window.location.href = "giohang.html";
    }
});
