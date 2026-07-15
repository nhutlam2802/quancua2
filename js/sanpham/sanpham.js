// Khai báo class phân loại 
export class Variant{
    constructor(size,price){
        this.size=size;
        this.price=price;
    }
}
// Khai báo class Sản phẩm
export class Product {
    constructor(id,name,image,variant) {
        this.id=id;
        this.name = name;
        this.image = image;
        this.variant = variant;
    }
    // Chuyển thông tin cơ bản của sản phẩm thành một chuỗi html để hiển thị
    add_thongtin(){ 
            return `
            <div class="product">
                <img class="product__img" src="${this.image}">
                <a href="chitietsp.html?id=${this.id}">${this.name}</a>
                <p id="price">${this.variant[0].price.toLocaleString('vi-VN')}đ</p>
                ${this.rating()}
            </div>
        `; 
        }
    //Chuyển thông tin chi tiết của sản phẩm thành một chuỗi html để hiển thị
    thongtinsp() {
            return `
                <img class="product-detail__img"src="${this.image}">
                <div class="product-detail__infor">
                    <h2>${this.name}</h2>
                    <label class="product-detail__label">Phân loại:</label>
                    <select class="product-detail__info-select">
                        ${this.variant.map(v =>
                            `<option value="${v.size}">${v.size}</option>`
                        ).join("")}
                    </select>
                    <p class ="product-detail__price"> ${this.variant[0].price.toLocaleString('vi-VN')}đ</p>
                    <div class="product-detail__count">
                        <p> Số lượng:</p>
                        <button class="product-detail__count-btn" id="sum">+</button>
                        <input class="product-detail__count-input" type="number">
                        <button class="product-detail__count-btn" id = "minus">-</button>
                    </div>
                    <div class="product-detail__status">
                        <P> Đã bán: 400</P>
                        <p> Còn lại: 60 </p>
                    </div>
                    <div class="product-detail__action">
                        <button class="product-detail__btn" id="buy"> Mua ngay </button>
                        <button class="product-detail__btn" id="add-cart">Thêm vào giỏ hàng</button>
                    </div>
                </div>
            `;
        }
        rating(){
            let star;

            if(this.id==1 ||this.id==4 || this.id==7 || this.id==11)
                star = 4.7;
            else if(this.id==2 || this.id==6 || this.id==9 || this.id==12)
                star = 4.5;
            else
                star = 4.0;
//Hàm toFix(1) giữ lại 1 chữ số sau dấu phẩy, chuyển số thành dạng chuỗi
            return `
                <p class="rating" id ="rating">
                    Đánh giá: ${star.toFixed(1)} 
                    <span class="fa-solid fa-star"></span>
                </p>
            `;
        }
}
// Khai báo class Item, là sản phẩm trong giỏ hàng
export class Item{
    constructor(product, variant, quantity){
        this.product = product;
        this.variant = variant;
        this.quantity = Number(quantity);
    }
}

