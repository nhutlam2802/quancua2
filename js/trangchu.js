// Bao gồm các chức năng cho Trang chủ: 
// Hiển thị Banner có nút prev va dot cho phép chuyển sang Banner khác hoặc chuyển tự động sau 5s
// Hiển thị Món ăn bán chạy lấy từ listproduct.js

// Chuyển Banner 
let currentBanner = 0;
const banners = document.querySelectorAll(".page-main__banner");
const dots = document.querySelectorAll(".page-main__banner-dot");

// Hàm hiển thị Banner
function showBanner(index) {
    banners.forEach((banner, i) => banner.classList.toggle("active", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
}

// Hàm chuyển sang Banner tiếp theo
function nextBanner() {
    currentBanner = (currentBanner + 1) % banners.length;
    showBanner(currentBanner);
}

// Hàm quay lại Banner trước đó
function prevBanner() {
    currentBanner = (currentBanner - 1 + banners.length) % banners.length;
    showBanner(currentBanner);
}

document.querySelector(".page-main__banner-btn--next").addEventListener("click", nextBanner);

document.querySelector(".page-main__banner-btn--prev").addEventListener("click", prevBanner);

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentBanner = index;
        showBanner(currentBanner);
    });
});

// Chuyển Banner tự động sau 5s
setInterval(nextBanner, 5000);

// Hiển thị Banner hiện tại
showBanner(currentBanner);

// Import danh sách sản phẩm
import {listproduct} from "./sanpham/listproduct.js"

// Danh sách ID các món ăn bán chạy
const bestseller = [1, 2, 3, 4, 5, 6];

// Tìm sản phẩm theo ID
function getProductById(id) {
    return listproduct.find(product => product.id === id);
}

// Tạo và hiển thị danh sách món ăn bán chạy bằng DOM
function renderBestSeller() {
    const content = document.querySelector(".suggest-detail__content");
    if(!content) return;

    for(let i = 0; i < bestseller.length; i++) {
        let id = bestseller[i];
        let product = getProductById(id);

        if(!product) continue;

        let article = document.createElement("article");
        article.className = "product";
        content.appendChild(article);

        let a = document.createElement("a");
        a.href = "chitietsp.html?id=" + id;
        article.appendChild(a);

        let img = document.createElement("img");
        img.className = "product-img";
        img.src = product.img;
        img.alt = product.name;
        a.appendChild(img);

        let h3 = document.createElement("h3");
        h3.className = "product-name";
        h3.textContent = product.name;
        a.appendChild(h3);

        let productid = document.createElement("p");
        productid.className = "product-id";
        productid.hidden = true;
        productid.textContent = product.id;
        a.appendChild(productid);

        let p = document.createElement("p");
        p.className = "product-price";
        p.textContent = product.variant[0].price;
        a.appendChild(p);

        let rating = document.createElement("div");
        rating.className = "rating";

        let score = document.createElement("p");
        score.className = "product-score";
        score.textContent = "4.5";

        let star = document.createElement("span");
        star.className = "fa-solid fa-star";

        rating.appendChild(score);
        rating.appendChild(star);

        a.appendChild(rating);
    }
    setPrice();
}

// Định dạng giá tiền theo chuẩn Việt Nam
function setPrice() {
    const price = document.querySelectorAll(".product-price");
    for(let i = 0; i < price.length; i++) {
        price[i].textContent = 
            Number(price[i].textContent).toLocaleString("vi-VN") + "đ";
    }
}

// Khởi tạo dữ liệu khi trang được tải
function setup() {
    renderBestSeller();
}

window.addEventListener("DOMContentLoaded", setup);