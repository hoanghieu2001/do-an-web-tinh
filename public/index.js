// footer  

// var swiper = new Swiper('.swiper', {
//     slidesPerView: 6,
//     direction: getDirection(),
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
//     on: {
//         resize: function () {
//             swiper.changeDirection(getDirection());
//         },
//     },
// });

function getDirection() {
    var windowWidth = window.innerWidth;
    var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

    return direction;
}

// thêm vào giỏ hàng
// const btnAddToCarts = document.querySelectorAll(".btn-add-to-cart");

// btnAddToCarts.forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//         e.preventDefault();
//         e.stopPropagation();

//         const productCard = btn.closest(".feature-product-card");

//         const productId = productCard.dataset.productId;

//         const cart = JSON.parse(localStorage.getItem("cart")) || {
//             items: []
//         };

//         const item = cart.items.find((item) => item.id == productId);

//         if (item) {
//             item.quantity++;
//         } else {
//             cart.items.push({ id: productId, quantity: 1 });
//         }

//         localStorage.setItem("cart", JSON.stringify(cart));

//         toastr.success("Thêm sản phẩm vào giỏ hàng thành công");
//     });
// });


// render 8 sản phẩm
// Số lần render đã được gọi
let renderCount = 0;

// Dữ liệu sản phẩm
const productList = [
    {
        id: 1,
        name: 'Đồ công sở nữ'
    }
    // Danh sách các sản phẩm
    // ...
];
// Hàm updateProduct
const product = [
    {
        images: "./images/item6.png",
        title: "Bộ đầm nữ trắng",
        prices: " 2000000VNĐ",
        id: 1
    },
    {
        images: "./images/item12.png",
        title: "Bộ đầm nữ màu đỏ",
        prices: "1.400.000VNĐ",
        id: 2
    },
    {
        images: "./images/item13.png",
        title: "Bộ đầm nữ xanh hồng",
        prices: "2.500.000VNĐ",
        id: 3
    },
    {
        images: "./images/item4.png",
        title: "Bộ đầm nữ hồng 2",
        prices: "2.100.000VNĐ",
        id: 4
    },
]

function updateProduct(limit) {
    // Kiểm tra số lần render đã đạt giới hạn
    if (renderCount >= limit) {
        console.log("Đã đạt giới hạn render.");
        return;
    }

    // Lấy ra 8 sản phẩm đầu tiên
    const products = productList.slice(0, 8);

    // Render sản phẩm
    products.forEach((product) => {


        // Render mỗi sản phẩm vào giao diện
        // ...
    });

    // Tăng số lần render đã gọi
    renderCount++;

    console.log("Đã render", renderCount, "lần.");
}
// $(document).ready(function () {
//     $("#button").click(function () {
//         var ttt = `<div>
//        <article class="series position-relative p-10">
//                                     <a href="" class="series-link d-block">
//                                         <img class="series-poster mw-100" src="${product.images}" alt="" />

//                                         <h5>
//                                             <a href="">${product.title}</a>
//                                             <div class="price">
//                                                 <a href="">${product.prices}</a>
//                                                 <i class="bi bi-handbag"></i>
//                                             </div>
//                                         </h5>
//                                         </span>


//                                     </a>
//                                 </article>
//     </div>`;
//         $("#herder-anh").html(ttt);
//         // updateProduct(8);
//     });
// });
const openElement = document.querySelector(".open");
const sanPhamContainer = document.getElementById("herder-anh"); // Sử dụng document.getElementById thay vì document.querySelectorID
document.getElementById("button").addEventListener("click", function () {
    debugger
    if (sanPhamContainer.style.display == "none") {
        sanPhamContainer.style.display = "flex"
        var productHTML = "";
        for (var i = 0; i < product.length; i++) {
            var currentProduct = product[i];
            productHTML += `
                                        <div class="col-sm-4 col-xxl-3 mt-2 col-sm-6 col-xs-12 p">
                                            <article class="series position-relative p-10 ms-2">
                                                <a href="" class="series-link d-block">
                                                    <img class="series-poster mw-100" src="${currentProduct.images}" alt="" />
                                                    <span class=" d-block"> <img
                                                            class="position-absolute top-0  text-light "
                                                            style="left: -9px; z-index: 1;"
                                                            src="./images/bg-seller.png " alt="">
                                                        <p class="position-absolute  text-light "
                                                            style="z-index: 2; text-align: center; top: 4px; left: 9px;">
                                                            Best Seller </p>
                                                    </span>

                                                    <div id="triangle-up"></div>
                                                    <div id="triangle-down"></div>
                                                    <div id="triangle-left"></div>
                                                    <div id="triangle-right"></div>
                                                    <span>

                                                        <h5>
                                                            <a href="">${currentProduct.title}</a>
                                                            <div class="price">
                                                                <a href="">${currentProduct.prices}</a>
                                                                <i class="bi bi-handbag"></i>
                                                            </div>
                                                        </h5>
                                                    </span>


                                                </a>
                                            </article>
                                        </div>
    `;
        }
        sanPhamContainer.innerHTML = productHTML;
    }
    else if (sanPhamContainer.style.display == "flex") {
        sanPhamContainer.style.display = "none"
    }

    // if (sanPhamContainer === open) {
    //     return ''
    // } else {
    //     return 
    // }
    //

    // document.getElementById("herder-anh").innerHTML = productHTML;
    // updateProduct(4);
});
/// Thông báo sự kiện click
const clickme = document.querySelector(".thong-bao");
clickme.addEventListener("click", (event) => {
    alert('Gửi mail thành công')
})