export class Product {
    constructor(id,name, image, variants) {
        this.id=id;
        this.name = name;
        this.image = image;
        this.variants = variants;
    }

    render(){ //chuyen thanh cac phan tu html cua product
        return `
        <div class="product">
            <img class="product__img" src="${this.image}">
            <a href="#">${this.name}</a>
            <p>${this.variants[0].price.toLocaleString('vi-VN')}đ</p>
        </div>
    `;
    }
}


