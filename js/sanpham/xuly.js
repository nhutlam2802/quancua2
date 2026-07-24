
//Bao gồm các chức năng cho trang sản phẩm và chi tiết sản phẩm:
//Trang sản phẩm: 
    // + Chuyển đổi định dạng giá tiền 
    // +Đổi đánh giá sao theo id 
//Trang chi tiết:
    //+Dựa vào JSON lưu dữ liệu sản phẩm, tạo tự động các nút phân loại, chuyển đổi giá theo phân loại
    // +Kiểm tra đăng nhập 
    // +Xử lý tăng giảm sản phẩm 
    // +Xử lý sự kiện gửi bình luận
    // +Cập nhật điểm đánh giá khớp với đánh giá sao
    // +Đưa sản phẩm được chọn vào localStorange để xử lý giỏ hàng 
    // +Hiển thị đề xuất 4 sản phẩm có id tiếp theo từ listproduct

import { listproduct } from "./listproduct.js";

//Tìm vị trí của sản phẩm theo id
function findIndex(id){
    for(let i=0;i<listproduct.length;i++)
    {
        if(listproduct[i].id==id)
            return i;
    }
    return -1;
}


//Hàm chuyển đổi định dạng giá tiền, từ chuỗi số bình thường thành định dạng VNĐ
function setPrice()
{
    const price = document.querySelectorAll(".product-price");
    price.forEach(product=>{
        product.innerText = Number(product.innerText)
        .toLocaleString("de-DE",{style: 'currency',currency:'VND'});
    },false)
}


//Hàm cập nhật đánh giá sao, cập nhật thủ công theo id sản phẩm
function rating()
{
    const star=document.querySelectorAll(".product-score");
    const id = document.querySelectorAll(".product-id");
    for(let i =0;i<id.length;i++)
    {
        if(id[i].textContent==1||id[i].textContent==4||id[i].textContent==7||id[i].textContent==10)
            star[i].textContent="4.7"; 
        else if(id[i].textContent==2||id[i].textContent==5||id[i].textContent==8||id[i].textContent==11) 
            star[i].textContent="4.0"; 
    }
}


//Cập nhật điểm đánh giá trùng với đánh giá sao trước đó bên trang sản phẩm
function score(id)
{
    const score=document.getElementById("rating-score");
    for(let i =0;i<id.length;i++)
    {
        if(id==1||id==4||id==7||id==10)
            score.textContent="4.7"; 
        else if(id==2||id==5||id==8||id==11)
            score.textContent="4.0"; 
    }
}


//Kiểm tra người dùng đã đăng nhập hay chưa, chỉ khi đăng nhập mới được sử dụng chức năng mua hàng
function checklogin(){
    const user = JSON.parse(localStorage.getItem("userLogin"));
    if (user==null) {
        alert("Vui lòng đăng nhập để tiếp tục.");
        return false;
    }
    else return true;
}

//Tăng giảm số lượng sản phẩm, theo nút bấm hoặc cho người dùng nhập theo ý muốn, ít nhất là 1, lớn nhất là 100, 
// tự động sửa số lượng nếu nhập vượt ngoài phạm vi
//Báo lỗi nếu nhập kí tự khác số hoặc bỏ trống, chuyển số lượng về thành 1
function inputamount(){
    const sum = document.getElementById("sum");
    const minus = document.getElementById("minus");
    const input = document.getElementById("quantity");
        sum.addEventListener("click",()=>
        {
            if(input.value>=1&&input.value<=1000)
                input.value++;
        })
        minus.addEventListener("click",()=>
        {
            if(input.value>1)
            input.value--;
        })
        input.addEventListener("input",()=>{
            //Chuyển số lượng sản phẩm nhập vào vào thành số nguyên
            input.value = parseInt(input.value);  
            if (input.value>100) input.value=100;
            if (input.value<=0 || input.value=="") input.value=1;
            })
}


// Thêm 4 sản phẩm có id kế sau sản phẩm đang xem vào phần đề xuất khác
function addproduct(id){
    id= Number(id); 
    const content = document.querySelector(".suggest-content");
    for(let i =id;i<id+4;i++)
    {
        let x = i%listproduct.length+1;
        let index = findIndex(x);
        if(!listproduct) return; 
        let article = document.createElement("article");
        article.className = "product";
        content.appendChild(article);
        let a = document.createElement("a");
        a.href = "chitietsp.html?id="+x;
        article.appendChild(a);
        let img = document.createElement("img");
        img.className = "product-img";
        img.src = listproduct[index].img;
        a.appendChild(img);
        let h4 = document.createElement("h4");
        h4.className = "product-name";
        h4.textContent = listproduct[index].name;
        a.appendChild(h4);
        let p = document.createElement("p");
        p.className = "product-price";
        p.textContent = listproduct[index].variant[0].price;
        a.appendChild(p);
    }
    setPrice();
}


//Thêm dữ liệu sản phẩm được chọn vào localStorage, lưu dưới khóa là cartKey.
function addcart(id,sizeSelected,quantity,price){
    const index=findIndex(id);
    //Tạo object item để lưu dữ liệu sản phẩm, có các key bên trái, value bên phải
    let item={                          
        id: id,
        name: listproduct[index].name,
        size: sizeSelected,
        price: price,
        quantity:Number(quantity),
    }
    //Lấy thông tin đăng nhập của người dùng hiện tại trong localStorage
    let user = JSON.parse(localStorage.getItem("userLogin"));
    //Tạo key cartKey bằng cách ghép cart và số điện thoại của user
    const cartKey = "cart_"+user.soDienThoai;
    //Lấy ra cartKey lưu về cartItems, chưa có thì tạo 1 mảng cartItems rỗng
    let cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
    //Đưa sản phẩm vào mảng cartItems
    cartItems.push(item);
    //Lưu vào localStorage dưới khóa là cartKey
    localStorage.setItem(cartKey,JSON.stringify(cartItems));
}

//Kiểm tra xem người dùng đã nhập bình luận hay chưa
function checkempty(){
    const comment = document.getElementById("comment-message");
    if (comment.value=="") return true;
    else return false;
}

//Gửi bình luận
function sendcomment(){
    const comment = document.getElementById("comment-message");
    const send = document.getElementById("submit");
    send.addEventListener("click",()=>{
        if(checklogin())
        {
            if(checkempty()) 
                alert("Bạn chưa nhập bình luận!");
            else 
                alert("Bình luận đã được gửi đi. Xin cảm ơn ý kiến của bạn.");
                comment.value="";
        }
    })
}


//Xu ly hien thi trang chi tiet san pham
function setupproductdetailpage(){
    //Dùng URLSearchParams để lấy ra tham số trên đường dẫn, vì đường dẫn trước đó đã có tham số id 
    const url = new URLSearchParams(window.location.search);
    const id=url.get("id");
    const name=document.querySelector(".product__detail-name");
    const img = document.querySelector(".product__detail-img");
    const price = document.querySelector(".product__detail-price");
    const index = findIndex(id);
    const product = listproduct[index];
    console.log("index id là " +index);
    const variant = listproduct[index].variant; 
    //Mặc định khi người dùng chưa chọn size thì lưu size và price là giá trị đầu tiên trong variant
    let sizeSelected=variant[0].size;
    let priceSelected=variant[0].price;
    name.textContent=product.name;
    img.src=product.img;
    price.textContent=Number(variant[0].price).toLocaleString("vi-VN")+"đ";
    const size=document.querySelector(".product__detail-size");
    let button="";
    //Dựa theo dữ liệu từng sản phẩm trong mảng listproduct, để tạo các nút chọn phân loại tương ứng
    for(let i=0;i<variant.length;i++)
    {
        button = document.createElement("button");
        size.appendChild(button);
        button.textContent=variant[i].size;
        button.className=("size-button");
        button.addEventListener("click",()=>{
            price.textContent = Number(variant[i].price).toLocaleString("vi-VN")+"đ";
            sizeSelected = variant[i].size;
            priceSelected = variant[i].price;
    })
    }
    //Chỉnh hiệu ứng cho nút được chọn
    const Arraybutton = document.querySelectorAll(".size-button");
    Arraybutton.forEach(buttonclick=>{
        buttonclick.addEventListener("click",()=>{
            Arraybutton.forEach(button=>{
                button.classList.remove("size-button-on");
            })
            buttonclick.classList.add("size-button-on");
        })
    })
    

    //Thêm xử lý sự kiện các nút thêm vào giỏ hàng, mua hàng
    const add = document.getElementById("add-cart");
    const buy = document.getElementById("buy");
    inputamount();
    add.addEventListener("click",()=>{
        if(checklogin())
        {   
            const quantity = document.getElementById("quantity").value;
            addcart(id,sizeSelected,quantity,priceSelected);
            alert("Đã thêm vào giỏ hàng thành công");
        }
    })
    buy.addEventListener("click",()=>{
        if(checklogin())
        {
            const quantity = document.getElementById("quantity").value;
            addcart(id,sizeSelected,quantity,priceSelected);
            window.location.href="giohang.html";
        }
    })
    sendcomment();
    score(id);
    addproduct(id);
}


function setup(){
    setPrice();
    rating();
    setupproductdetailpage();
}

window.addEventListener("load",setup,false);
