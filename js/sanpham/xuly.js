import { list_product } from "./listproduct.js";
import { Item } from "./sanpham.js";
function khoitao_trangsp(){
    const product_list = document.querySelector(".product-list");
    if (!product_list) return;
    product_list.innerHTML=list_product.map(item=>item.add_thongtin()).join("");
    
}
function doigia(product,sizeSelect,price){
    const variant = product.variant.find(v=>v.size==sizeSelect.value);
    price.innerText = `${variant.price.toLocaleString('vi-VN')}đ`;
}
function khoitaotrangchitiet(){
    const product_detail=document.querySelector(".product__detail");
    if(!product_detail) return;
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));
    const product = list_product.find(item => item.id == id); //so sanh tuyet doi
        if (product) {
            product_detail.innerHTML=product.thongtinsp();
        }
    const sizeSelect = document.querySelector(".product-detail__info-select");
    const price = document.querySelector(".product-detail__price");
        doigia(product,sizeSelect,price);
    sizeSelect.addEventListener("change",function(){
        doigia(product,sizeSelect,price)
    });
    add_cart(product);
    add_suggest(product);
}
function inputamount(){
    const sum = document.getElementById("sum");
    const minus = document.getElementById("minus");
    const input = document.querySelector(".product-detail__count-input");
    input.value=1;
        sum.addEventListener("click",()=>
        {
            if(input.value>=1&&input.value<=1000)
                input.value++;
        })
        minus.addEventListener("click",()=>
        {
            if(input.value>1)
            input.value--;
        })
        input.addEventListener("input",()=>{
            if (input.value>100) input.value=100;
        })

}
function add_cart(product) {
    const input = document.querySelector(".product-detail__count-input");
    const add = document.getElementById("add-cart");
    const sizeSelect = document.querySelector(".product__info-select");
    add.addEventListener("click", () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || []; //tim du lieu luu duoi dang cart 
    //trong localStorage, chua co thi tao 1 mang rong
        const variant = product.variant.find(v=>v.size==sizeSelect.value);
        const item = new Item(product,variant,input.value);
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));     
    });
    buy.addEventListener("click",() => {
        window.location.href="giohang.html";
    })
}
function add_suggest(sp) {
    const suggest = document.querySelector(".suggest__content");

    const index = list_product.findIndex(item => item.id === sp.id);

    let html = "";

    for (let i = 1; i <= 4; i++) {
        const item = list_product[(index + i) % list_product.length];
        html += item.add_thongtin();
    }
    suggest.innerHTML = html;
}


khoitao_trangsp();
khoitaotrangchitiet();
inputamount();
