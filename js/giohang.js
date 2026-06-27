function hienThiGioHang(){

    const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    const cartBody =
    document.getElementById("cart-body");

    let html = "";
    let tongTien = 0;

    cart.forEach((item,index)=>{

        const thanhTien =
        item.variant.price * item.quantity;

        tongTien += thanhTien;

        html += `
        <div class="cart-row">


            <div>
                ${item.product.name}
                <br>
                <small>
                    Size: ${item.variant.size}
                </small>
            </div>

            <div>

                <button onclick="giamSL(${index})">-</button>

                <span class="sl">
                    ${item.quantity}
                </span>

                <button onclick="tangSL(${index})">+</button>

            </div>

            <div>
                ${item.variant.price.toLocaleString("vi-VN")}đ
            </div>

            <div class="thanhtien">
                ${thanhTien.toLocaleString("vi-VN")}đ
            </div>

            <div>
                <button onclick="xoaSP(${index})">
                    X
                </button>
            </div>

        </div>
        `;
    });

    cartBody.innerHTML = html;

    document.getElementById("tongtien").innerText =
    tongTien.toLocaleString("vi-VN");
}

function tangSL(index){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity++;

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    hienThiGioHang();
}

function giamSL(index){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    if(cart[index].quantity > 1){
        cart[index].quantity--;
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    hienThiGioHang();
}

function xoaSP(index){

    if(confirm("Bạn có chắc muốn xóa sản phẩm?")){

        let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

        cart.splice(index,1);

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        hienThiGioHang();
    }
}

window.onload = hienThiGioHang;