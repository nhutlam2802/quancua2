import { list_product } from "./listproduct.js";
import { Item } from "./sanpham.js";
function add_thongtin(product){ //chuyen thanh cac phan tu html cua product
        return `
        <div class="product">
            <img class="product__img" src="${product.image}">
            <a href="chitietsp.html?id=${product.id}">${product.name}</a>
            <p>${product.variant[0].price.toLocaleString('vi-VN')}đ</p>
        </div>
    `;
    }
function thongtinsp(product) {
        return `
        <div class="product-detail">
            <img class="product-detail__img"src="${product.image}">
            <div class="product-detail__infor">
                <h2>${product.name}</h2>
                <label class="product-detail__label">Phân loại:</label>
                <select class="product-detail__info-select">
                    ${product.variant.map(v =>
                        `<option value="${v.size}">${v.size}</option>`
                    ).join("")}
                </select>
                <p class ="product-detail__price" > ${product.variant[0].price.toLocaleString('vi-VN')}đ</p>
                <div class="product-detail__count">
                    <p> Số lượng:</p>
                    <button class="product-detail__count-btn" id="sum">+</button>
                    <input class="product-detail__count-input" type="number">
                    <button class="product-detail__count-btn" id = "minus">-</button>
                </div>
                <div class="product-detail__action">
                    <button class="product-detail__btn" id="buy"> Mua ngay </button>
                    <button class="product-detail__btn" id="add-cart">Thêm vào giỏ hàng</button>
                </div>
            </div>
        </div>
        `;
    }
function khoitao_trangsp(){
    const product_list = document.querySelector(".product-list");
    if (!product_list) return;
    product_list.innerHTML=list_product.map(item=>add_thongtin(item)).join("");
    
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
            product_detail.innerHTML=thongtinsp(product);
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
    const sizeSelect = document.querySelector(".product-detail__info-select");
    const buy = document.getElementById("buy");
    function infor(){
        const cart = JSON.parse(localStorage.getItem("cart")) || []; //tim du lieu luu duoi dang cart 
    //trong localStorage, chua co thi tao 1 mang rong
        const variant = product.variant.find(v=>v.size==sizeSelect.value);
        const item = new Item(product,variant,input.value);
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));  
    }
    add.addEventListener("click", () => { 
        infor();  
    });
    buy.addEventListener("click",() => {
        window.location.href="giohang.html";
        infor();
    })
}
function add_suggest(sp) {
    const suggest = document.querySelector(".suggest__content");

    const index = list_product.findIndex(item => item.id === sp.id);

    let html = "";

    for (let i = 1; i <= 4; i++) {
        const item = list_product[(index + i) % list_product.length];
        html += add_thongtin(item);
    }
    suggest.innerHTML = html;
}


khoitao_trangsp();
khoitaotrangchitiet();
inputamount();
