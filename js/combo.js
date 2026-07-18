import { list_product_combo } from "./listproductcombo.js";
import { Item } from "./sanpham/sanpham.js";

const input = document.querySelector(".product-detail__count-input");
const plus = document.getElementById("sum");
const minus = document.getElementById("minus");
const add = document.getElementById("add-cart");
const buy = document.getElementById("buy");

if (input) input.value = 1;

// Lấy id từ HTML
const id = Number(add.dataset.id);

// Tìm sản phẩm
const product = list_product_combo.find(item => item.id === id);

// Hàm kiểm tra sản phẩm đã tồn tại trong giỏ chưa
function isExistedInCart(item, cart) {
    return cart.findIndex(cartItem => cartItem.product.id === item.product.id);
}

// Tăng số lượng
plus.onclick = () => {
    input.value = Number(input.value) + 1;
};

// Giảm số lượng
minus.onclick = () => {
    if (Number(input.value) > 1) {
        input.value = Number(input.value) - 1;
    }
};

// Hàm thêm vào giỏ
function addToCart() {
    const user = JSON.parse(localStorage.getItem("userLogin"));

    if (!user) {
        alert("Vui lòng đăng nhập trước khi thêm vào giỏ hàng!");
        return;
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
}
// Thêm giỏ hàng
add.onclick = () => {
    addToCart();
    alert("Đã thêm vào giỏ hàng!");
};
// Mua ngay
buy.onclick = () => {
    addToCart();
    location.href = "giohang.html";
};
