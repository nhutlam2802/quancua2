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
    new Product(
        7,
        "Xúc xích chiên xù",
        "/images/xucxich.png",
        [{size: "Phần",price:10000}]
    ),
    new Product(
        8,
        "Khoai tây chiên",
        "/images/khoaichien.png",
        [   {size: "S",price:10000},
            {size: "M",price:15000}
        ]
    ),
    new Product(
        9,
        "Bắp xào",
        "/images/bapxao.png",
        [{size: "Phần",price:15000}]
    ),
    new Product(
        10,
        "Chả giò",
        "/images/chagio.png",
        [{size: "Phần",price:12000}]
    ),
    new Product(
        11,
        "Gà lắc phô mai",
        "images/galac.png",
        [{size: "Phần",price:30000}]
    ),
    new Product(
        12,
        "Xoài lắc",
        "/images/xoailac.png",
        [{size: "Phần",price:10000}]
    ),
]
