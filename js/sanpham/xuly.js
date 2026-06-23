import { list_product } from "./listproduct.js";

const product_list = document.getElementById("product-list");
if(product_list){
    product_list.innerHTML=list_product.map(item=>item.add_thongtin()).join("");
}
let product;
const product_detail=document.getElementById("detail");
if (product_detail) {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));
    product = list_product.find(item => item.id === id);

    if (product) {
        product_detail.innerHTML=product.thongtinsp();
    }
}
const sizeSelect = document.getElementById("size-select");
const price = document.getElementById("price");

sizeSelect.addEventListener("change", () => {
    const variant = product.variants.find(
        v => v.size === sizeSelect.value
    );

    price.innerText =
        `${variant.price.toLocaleString('vi-VN')}đ`;
});

