let currentBanner = 0;
const banners = document.querySelectorAll(".page-main__banner");
const dots = document.querySelectorAll(".page-main__banner-dot");
const totalBanners = banners.length;

function showBanner(index) {
    banners.forEach((banner, i) => {
        banner.classList.toggle("active", i === index);
        if (dots[i]) {
            dots[i].classList.toggle("active", i === index);
        }
    });
}

function nextBanner() {
    currentBanner = (currentBanner + 1) % totalBanners;
    showBanner(currentBanner);
}

function prevBanner() {
    currentBanner = (currentBanner - 1 + totalBanners) % totalBanners;
    showBanner(currentBanner);
}

setInterval(nextBanner, 5000); // Tu dong chuyen banner moi 5 giay

document.querySelector(".page-main__banner-btn--prev").addEventListener("click", prevBanner);
document.querySelector(".page-main__banner-btn--next").addEventListener("click", nextBanner);

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentBanner = index;
        showBanner(currentBanner);
    });
});

showBanner(currentBanner);

import { list_product } from "./sanpham/listproduct.js";

// 1. Tạo danh sách sản phẩm bán chạy (chọn thủ công theo ID)
const best_seller = [
    list_product.find(p => p.id === 1), // Chân gà sốt thái
    list_product.find(p => p.id === 2), // Bánh tráng nướng
    list_product.find(p => p.id === 4), // Mì trộn
    list_product.find(p => p.id === 6), // Gà rán
    list_product.find(p => p.id === 8), // Khoai tây chiên
    list_product.find(p => p.id === 11) // Gà lắc phô mai
];

// 2. Render ra trang chủ
function renderBestSeller() {
    const container = document.querySelector(".suggest-detail__content");
    if (!container) return;
    container.innerHTML = best_seller
        .filter(item => item) // loại bỏ undefined
        .map(item => item.add_thongtin())
        .join("");

}

document.addEventListener("DOMContentLoaded", renderBestSeller);

document.querySelectorAll(".promotion__item").forEach(item => {
    const span = document.createElement("span");
    item.appendChild(span);
});
