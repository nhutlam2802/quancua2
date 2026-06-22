import { list_product } from "./listproduct.js";
const product = list_product.map(item=>item.render()).join("");
//map chuyen tung ptu trong list_product tu dang object thanh html
document.getElementById("product-list").innerHTML=product;
//them phan tu product da chuyen doi va html