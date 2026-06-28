export class Variant{
    constructor(size,price){
        this.size=size;
        this.price=price;
    }
}
export class Product {
    constructor(id,name,image,variant) {
        this.id=id;
        this.name = name;
        this.image = image;
        this.variant = variant;
    }

    add_thongtin(){ //chuyen thanh cac phan tu html cua product
        return `
        <div class="product">
            <img class="product__img" src="${this.image}">
            <a href="chitietsp.html?id=${this.id}">${this.name}</a>
            <p>${this.variant[0].price.toLocaleString('vi-VN')}đ</p>
        </div>
    `;
    }
    thongtinsp() {
        return `
        <div class="product-detail">
            <img class="product-detail__img"src="${this.image}">
            <div class="product-detail__infor">
                <h2>${this.name}</h2>
                <label class="product-detail__label">Phân loại:</label>
                <select class="product-detail__info-select">
                    ${this.variant.map(v =>
                        `<option value="${v.size}">${v.size}</option>`
                    ).join("")}
                </select>
                <p class ="product-detail__price" > ${this.variant[0].price.toLocaleString('vi-VN')}đ</p>
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
}
export class Item{
    constructor(product, variant, quantity){
        this.product = product;
        this.variant = variant;
        this.quantity = quantity;
    }
}

