// Người thực hiện: Trương Phạm Anh Thư - MSSV: B2404922
import { list_product_combo } from "./listproductcombo.js";// Liên kết và import dl từ file listproductcombo.js

const input = document.querySelector(".product-detail__count-input");// Tìm ô nhập số lượng sp
const plus = document.getElementById("sum");// Tìm nút +
const minus = document.getElementById("minus");// Tìm nút -
const add = document.getElementById("add-cart");// Tìm nút thêm vào giỏ hàng
const buy = document.getElementById("buy");// Tìm nút mua ngay

input.value = 1;

// Tìm vị trí sản phẩm theo id
function findIndex(id) {
    //Chức năng: tìm xem sp đang xem nằm ở vị trí nào trong danh sách dữ liệu gốc
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
    // Chức năng: Kiểm tra sản phẩm định thêm đã có trong giỏ hàng chưa (trùng cả id và Size)
    // Trả về: Vị trí của sản phẩm nếu đã có, hoặc -1 nếu chưa
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
    // 1. Kiểm tra đăng nhập (nếu chưa đăng nhập -> chuyển hướng sang trang đăng nhập)
    // 2. Khởi tạo giỏ hàng riêng biệt theo số điện thoại của user trong localStorage
    // 3. Tạo đối tượng sản phẩm (id, tên, ảnh, size, giá, số lượng)
    // 4. Nếu sản phẩm đã có trong giỏ -> cộng dồn số lượng, nếu chưa -> thêm mới vào mảng
    // 5. Lưu lại vào localStorage và cập nhật số hiển thị trên icon giỏ hàng
    const user = JSON.parse(localStorage.getItem("userLogin"));
    if (!user) {
        alert("Vui lòng đăng nhập trước khi mua hàng!");
        window.location.href = "dangnhap.html";
        return false;
    }

    // Tạo ra các giỏ hàng độc lập cho từng tài khoản
    const cartKey = "cart_" + user.soDienThoai;
    
    // Lấy chuỗi từ localStorage ra và chuyển thành mảng để JavaScript xử lý. 
    // Nếu chưa có dữ liệu thì lấy mảng rỗng []
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
    // Tạo ra một đối tượng (Object) đại diện cho 1 sp
    let item = {
            id: id,
            name: product.name,
            img: product.img,
            size: product.variant[0].size,
            price: product.variant[0].price,
            quantity: Number(input.value)
};

    //kiểm tra xem sản phẩm (item) mà người dùng vừa chọn đã có mặt trong giỏ hàng (cart) hay chưa.
    const existed = isExistedInCart(item, cart);

    if (existed != -1) {
        // 1. Nếu đã tồn tại: cộng thêm số lượng mới vào số lượng cũ
        cart[existed].quantity += item.quantity;
    } else {
        // 2. Nếu chưa có: thêm mới hoàn toàn sản phẩm vào giỏ
        cart.push(item);
    }

    // Chuyển mảng giỏ hàng thành chuỗi JSON rồi lưu vào localStorage
    localStorage.setItem(cartKey, JSON.stringify(cart));

    capNhatSoLuongGioHang();
    return true;
}

// Nút thêm vào giỏ hàng
add.addEventListener("click", function () {
    // Chức năng: Gọi hàm thêm vào giỏ, hiện thông báo thành công và giữ user ở lại trang
    if (addToCart()) {
        alert("Đã thêm vào giỏ hàng!");
    }
});

// Nút mua ngay
buy.addEventListener("click", function () {
    // Chức năng: Gọi hàm thêm vào giỏ, sau đó chuyển hướng thẳng user sang trang giỏ hàng để thanh toán
    if (addToCart()) {
        window.location.href = "giohang.html";
    }
});
