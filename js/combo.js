import { list_product_combo } from "./listproductcombo.js";
import { Item } from "./sanpham/sanpham.js";
const input = document.querySelector(".product-detail__count-input");
const plus = document.getElementById("sum");
const minus = document.getElementById("minus");
const add = document.getElementById("add-cart");
const buy = document.getElementById("buy");
if(input) input.value = 1;
const id = Number(add.dataset.id);
const product = list_product_combo.find(item => item.id === id);
// tăng số lượng
plus.onclick = () =>{
    input.value = Number(input.value)+1;
}
// giảm số lượng
minus.onclick = () =>{
    if(Number(input.value)>1){
        input.value = Number(input.value)-1;
    }
}
// thêm giỏ hàng
add.onclick = ()=>{
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = new Item(
        product,
        product.variant[0],
        Number(input.value)
    );
    cart.push(item);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
}
// mua ngay
buy.onclick = ()=>{
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = new Item(
        product,
        product.variant[0],
        Number(input.value)
    );
    cart.push(item);
    localStorage.setItem("cart",JSON.stringify(cart));
    window.location.href="giohang.html";
}
