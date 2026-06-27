import { Product,Variant } from "./sanpham.js";
export const list_product=[
    new Product(
        1,
        "Chân gà sốt thái",
        "/images/changa.png",
        [
            new Variant("S",35000),
            new Variant("M",50000),
            new Variant("L",80000)
        ]
    ),
    new Product(
        2,
        "Bánh tráng nướng",
        "/images/banhtrangnuong.png",
        [new Variant("Phần",20000)]
    ),
    new Product(
        3,
        "Bánh mì nướng",
        "/images/banhmi.png",
        [new Variant("Phần",20000)]
    ),
    new Product(
        4,
        "Mì trộn",
        "/images/mitron.png",
        [
            new Variant("S",25000),
            new Variant("M",40000)
        ]
    ),
    new Product(
        5,
        "Bánh tráng trộn",
        "/images/banhtrangtron.png",
        [new Variant("Phần",20000)]
    ),
    new Product(
        6,
        "Gà rán",
        "/images/garan.png",
        [new Variant("Phần",35000)]
    ),
    new Product(
        7,
        "Xúc xích chiên xù",
        "/images/xucxich.png",
        [new Variant("Phần",10000)]
    ),
    new Product(
        8,
        "Khoai tây chiên",
        "/images/khoaichien.png",
        [   new Variant("S",10000),
            new Variant("M",15000)
        ]
    ),
    new Product(
        9,
        "Bắp xào",
        "/images/bapxao.png",
        [new Variant("Phần",15000)]
    ),
    new Product(
        10,
        "Chả giò",
        "/images/chagio.png",
        [new Variant("Phần",12000)]
    ),
    new Product(
        11,
        "Gà lắc phô mai",
        "images/galac.png",
        [new Variant("Phần",30000)]
    ),
    new Product(
        12,
        "Xoài lắc",
        "/images/xoailac.png",
        [new Variant("Phần",10000)]
    ),
]
