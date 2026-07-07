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
}
export class Item{
    constructor(product, variant, quantity){
        this.product = product;
        this.variant = variant;
        this.quantity = Number(quantity);
    }
}

