// Danh sách sản phẩm
let products = [
    {
        id: 1,
        name: "Bộ công sở nữ đỏ hồng",
        description:
            "Màu sắc Juyp : đỏ hồng",
        price: 2500000,
        image: "https://product.hstatic.net/1000378554/product/dsc_9938_152bb16ff4464a58ae9d40d9b31cc455_master.jpg",
        count: 1
    },
    {
        id: 2,
        name: "Áo hai dây",
        description:
            " Màu sắc juyp: hoa nhí",
        price: 1500000,
        image: "https://product.hstatic.net/1000378554/product/dsc_9658_31e08e22925c473f9115ced7bf45e417_master.jpg",
        count: 1
    },
    {
        id: 3,
        name: "Áo Gile",
        description:
            "Màu sắc Juyp : nâu",

        price: 2400000,
        image: "https://product.hstatic.net/1000378554/product/dsc_0461_097f9342d60843ba9645ad1b08d86359_master.jpg",
        count: 1
    }
];

let promotionCode = {
    A: 10,
    B: 20,
    C: 30,
    D: 40
};

let currentCode;

$.each(products, function (index, product) {
    const $product = $(`
<li class="row" data-product-id="${product.id}">
  <div class="col left">
    <div class="thumbnail">
      <a href="#">
        <img style="height:200px; width:200px" src="${product.image}" alt="${product.name}" />
      </a>
    </div>
    <div class="detail">
      <div class="name"><a href="#">${product.name}</a></div>
      <div class="description">
        ${product.description}
      </div>
      <div class="price">${product.price.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND"
    })}</div>
    </div>
  </div>

  <div class="col right">
    <div class="quantity">
      <input type="number" class="quantity" step="1" value="${product.count}" />
      
    </div>

    <div class="remove">
      <span class="close"
        ><i class="fa fa-times" aria-hidden="true"></i
      ></span>
    </div>
  </div>
</li>
`);

    const $quantity = $("input.quantity", $product);
    const $remove = $(".remove", $product);

    $quantity.on("input", { $el: $quantity, product }, updateItem);
    $remove.on("click", { $el: $product, productId: product.id }, deleteItem);

    $product.appendTo($(".products"));
});

//Khi render ra thì phải có id của item product
//Khi click + - => là hàm changquantity => Check id của DOM đang được kích hoạt =>
//=> CLick + - xong => Thì lấy dược id => Lấy được price => Lấy được quantity sau khi click => Tổng tiền = product.id.price * quantity

//Update quantity cart
// function changeQuantity(event) {
//     let curentvalue = $(event).siblings(".quantity").val();
//     const id = $(event).closest(".row").data("product-id");
//     if ($(event).attr("class").includes("quantity_down")) {
//         curentvalue--;
//         console.log("Giảm")
//         if (curentvalue < 1) {
//             curentvalue == 1
//         }
//     } else {
//         curentvalue++;
//         console.log("Tăng")
//     }
//     $(event).siblings(".quantity").val(curentvalue);

//     let total = (products.[id - 1].price * curentvalue).toLocaleString() + "đ";
//     console.log(total);
// }

// - Cập nhật số lượng sản phẩm hiện có trong giỏ hàng
function updateTotalItem() {
    const total = products.reduce(function (total, product) {
        return (total += product.count);
    }, 0);

    $(".count .value").text(total);

    if (total == 0) {
        $("section.option-container").hide();

        setTimeout(function () {
            alert("Giỏ hàng trống");
        }, 100);
    }
}

const $callback = $.Callbacks();

$callback.add(updateTotalItem);
$callback.add(updateTotalPrice);

// - Xóa sản phẩm khỏi giỏ hàng
function deleteItem(e) {
    const $el = e.data.$el;
    const productId = e.data.productId;

    $el.remove();

    const idx = products.findIndex(function (product) {
        return product.id === productId;
    });

    products.splice(idx, 1);

    $callback.fire();
}
// - Thay đổi số lượng sản phẩm
function updateItem(e) {
    const $quantity = e.data.$el;
    const count = Number($quantity.val());
    const product = e.data.product;

    if (count > 0) {
        product.count = count;
    } else {
        product.count = 1;
        $quantity.val(1);
    }

    $callback.fire();
}

function calcSubTotal() {
    const total = products.reduce(function (total, product) {
        return (total += product.count * product.price);
    }, 0);

    return total;
}

// - Cập nhật tổng tiền
function updateTotalPrice() {
    const subTotal = calcSubTotal();
    const vat = subTotal * 0.05;
    const discount = promotionCode[currentCode] || 0;
    const total = subTotal + vat - (discount / 100) * subTotal;

    $(".subtotal .value").text(
        subTotal.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND"
        })
    );

    $(".vat .value").text(
        vat.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND"
        })
    );

    $(".total .value").text(
        total.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND"
        })
    );
}

// - Áp dụng mã giảm giá

const $promotion = $(".promotion");
const $code = $("#promo-code", $promotion);
const $button = $("button", $promotion);

$button.on("click", function (e) {
    const code = $code.val();

    if (code.toUpperCase() in promotionCode) {
        const discount = promotionCode[code.toUpperCase()];

        currentCode = code.toUpperCase();

        const $discount = $(".discount");
        $discount.removeClass("hide");
        $(".value", $discount).text(`${discount}%`);
        $callback.fire();
        alert("Áp dụng mã giảm giá thành công");
    } else {
        alert("Mã giảm giá không tồn tại");
    }
});

$callback.fire();
