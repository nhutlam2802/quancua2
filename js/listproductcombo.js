import { Product, Variant } from "./sanpham/sanpham.js";

export const list_product_combo = [

    new Product(
        101,
        "Combo 1 người",
        "/images/combo1nguoi.png",
        [
            new Variant("Combo",73000)
        ]
    ),

    new Product(
        102,
        "Combo 2 người",
        "/images/combo2nguoi.png",
        [
            new Variant("Combo",179000)
        ]
    ),

    new Product(
        104,
        "Combo 4 người",
        "/images/combo4nguoi.png",
        [
            new Variant("Combo",349000)
        ]
    ),

    new Product(
        109,
        "Combo 9 người",
        "/images/combo9nguoi.png",
        [
            new Variant("Combo",815000)
        ]
    )

];
