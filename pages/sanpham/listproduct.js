import { Product } from "./sanpham.js";
export const list_product=[
    new Product(
        1,
        "Chân gà sốt thái",
        "/images/changa.png",
        [
            { size: "S", price: 35000 },
            { size: "M", price: 50000 },
            { size: "L", price: 80000 }
        ]
    ),
    new Product(
        2,
        "Bánh tráng nướng",
        "/images/banhtrangnuong.png",
        [{size: "Phần",price:20000}]
    ),
    new Product(
        3,
        "Bánh mì nướng",
        "/images/banhmi.png",
        [{size: "Phần",price:20000}]
    ),
    new Product(
        4,
        "Mì trộn",
        "/images/mitron.png",
        [
            { size: "S", price: 25000 },
            { size: "M", price: 40000 }
        ]
    ),
    new Product(
        5,
        "Bánh tráng trộn",
        "/images/banhtrangtron.png",
        [{size: "Phần",price:20000}]
    ),
    new Product(
        6,
        "Gà rán",
        "/images/garan.png",
        [{size: "Phần",price:35000}]
    ),
]
