export class Product {
    constructor(id,name, image, variants) {
        this.id=id;
        this.name = name;
        this.image = image;
        this.variants = variants;
    }

    add_thongtin(){ //chuyen thanh cac phan tu html cua product
        return `
        <div class="product">
            <img class="product__img" src="${this.image}">
            <a href="chitietsp.html?id=${this.id}">${this.name}</a>
            <p>${this.variants[0].price.toLocaleString('vi-VN')}đ</p>
        </div>
    `;
    }
    thongtinsp() {
        return `
        <div class="product__detail">
            <img class="product__detail__img"src="${this.image}">
            <div class="info">
                <h1>${this.name}</h1>
                <label>Phân loại:</label>
                <select id="size-select">
                    ${this.variants.map(v =>
                        `<option value="${v.size}">${v.size}</option>`
                    ).join("")}
                </select>
                <p id="price"> ${this.variants[0].price.toLocaleString('vi-VN')}đ</p>
                <button id="buy">Mua ngay</button>
                <button id="add-cart">Thêm vào giỏ hàng</button>
            </div>
        </div>
        `;
    }
}



