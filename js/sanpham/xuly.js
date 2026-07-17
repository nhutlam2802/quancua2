import { list_product } from "./listproduct.js";
import { Item } from "./sanpham.js";
// Dùng map duyệt qua từng phần tử của mảng list_product (mảng chứa dữ liệu các sản phẩm)
// Dùng hàm add_thongtin để chuyển các thông tin cơ bản của sản phẩm thành chuỗi html, các chuỗi html tạo thành 
// 1 mảng mới, dùng join("") để liên kết các phần tử của mảng đó lại thành một chuỗi html
function khoitaotrangsp(){
    const product_list = document.querySelector(".product-list");
    if (!product_list) return;
    product_list.innerHTML=list_product.map(item=>item.add_thongtin()).join("");
}
function doigia(product,sizeSelect,price){
    const variant = product.variant.find(v=>v.size==sizeSelect.value);
    price.innerText = `${variant.price.toLocaleString('vi-VN')}đ`;
}

function createbreadcrumb(product){
    const breadcrumb = document.querySelector(".breadcrumb");
    breadcrumb.innerHTML= 
        `   <li> <a href="trangchu.html">Trang chủ</a></li>
            <li> <a href="sanpham.html">Thực đơn</a></li>
            <li> <a href="chitietsp.html?id=${product.id}">${product.name}</a></li>`
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
        else {
            window.location.href="chitietsp.html?id=1"
        }
    const sizeSelect = document.querySelector(".product-detail__info-select");
    const price = document.querySelector(".product-detail__price");
        doigia(product,sizeSelect,price);
    sizeSelect.addEventListener("change",()=>{
        doigia(product,sizeSelect,price)
    });
    createbreadcrumb(product);
    add_cart(product);
    add_suggest(product);
    score(product);
    rating(product);
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
            if (input.value<0) input.value=1;
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
        if(checklogin()) {
            infor();
            alert("Đã thêm vào giỏ hàng thành công!");
        }  
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
        html += item.add_thongtin();
    }
    suggest.innerHTML = html;
}
function checklogin(){
    const user = JSON.parse(localStorage.getItem("userLogin"));
    if (!user) {
        alert("Vui lòng đăng nhập trước khi mua hàng.");
        return false;
    }
    else return true;
}
function score(product){
    const score = document.getElementById("rating-score");
    if(product.id==1|| product.id==4 || product.id==7||product.id==11){
        score.innerText="TỔNG 4.7/5 trên tổng số 256 đánh giá";}
    if(product.id==2|| product.id==6 || product.id==9||product.id==12){
        score.innerText="TỔNG 4.5/5 trên tổng số 256 đánh giá";}
    if(product.id==3|| product.id==5 || product.id==8||product.id==10){
        score.innerText="TỔNG 4.0/5 trên tổng số 256 đánh giá";}
}
khoitaotrangsp();
khoitaotrangchitiet();
inputamount();
