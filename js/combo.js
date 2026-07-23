import { list_product_combo } from "./listproductcombo.js";

const input = document.querySelector(".product-detail__count-input");
const plus = document.getElementById("sum");
const minus = document.getElementById("minus");
const add = document.getElementById("add-cart");
const buy = document.getElementById("buy");

input.value = 1;

// Tìm vị trí sản phẩm theo id
function findIndex(id) {
    for (let i = 0; i < list_product_combo.length; i++) {
        if (list_product_combo[i].id == id) {
            return i;
        }
    }
    return -1;
}

// Lấy id sản phẩm
const id = Number(add.dataset.id);

// Tìm vị trí trong mảng
const index = findIndex(id);

// Lấy thông tin sản phẩm
const product = list_product_combo[index];

// Kiểm tra sản phẩm đã tồn tại chưa
function isExistedInCart(item, cart) {
    for (let i = 0; i < cart.length; i++) {
        if (
            cart[i].id == item.id &&
            cart[i].size == item.size
        ) {
            return i;
        }
    }
    return -1;
}

// Tăng số lượng
plus.addEventListener("click", function () {
    input.value = Number(input.value) + 1;
});

// Giảm số lượng
minus.addEventListener("click", function () {
    if (Number(input.value) > 1) {
        input.value = Number(input.value) - 1;
    }
});

// Thêm vào giỏ hàng
function addToCart() {
    const user = JSON.parse(localStorage.getItem("userLogin"));
    if (!user) {
        alert("Vui lòng đăng nhập trước khi mua hàng!");
        window.location.href = "dangnhap.html";
        return false;
    }

    const cartKey = "cart_" + user.soDienThoai;

    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    let item = {
            id: id,
            name: product.name,
            img: product.img,
            size: product.variant[0].size,
            price: product.variant[0].price,
            quantity: Number(input.value)
};

    const existed = isExistedInCart(item, cart);

    if (existed != -1) {
        cart[existed].quantity += item.quantity;
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
