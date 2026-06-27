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
            <div class="product__infor">
                <h1>${this.name}</h1>
                <label class="product__info-label">Phân loại:</label>
                <select class="product__info-select">
                    ${this.variant.map(v =>
                        `<option value="${v.size}">${v.size}</option>`
                    ).join("")}
                </select>
                <p class ="product__price" > ${this.variant[0].price.toLocaleString('vi-VN')}đ</p>
                <div class="product__count">
                    <p> Số lượng:</p>
                    <button class="product__count" id="sum">+</button>
                    <input class="product__count-input" type="number">
                    <button class="product__count" id = "minus">-</button>
                </div>
                <button class="product__btn" id="buy">Mua ngay</button>
                <button class="product__btn" id="add-cart">Thêm vào giỏ hàng</button>
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

