const products = {
    1: {
        id: 1,
        title: "Girl xinh 1",
        description: "Girl xinh 1",
        thumbnail:
            "https://image2.tin247.news/pictures/2023/03/18/vtq1679126603.jpg",
        price: 1000
    }
};
// Thêm vào giỏ hàng => localStorage

// Xoá sản phẩm

// Bấm nút delete để xoá sản phẩm
// Xoá trên giao diện
// Cập nhật thông tin giỏ hàng
const deleteButtons = document.querySelectorAll(".cart-item-actions button");
deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const cartItemElement = button.closest(".cart-item");

        cartItemElement.remove();
        updateCartInfo();
    });
});

// Cập nhật số lượng
const downButtons = document.querySelectorAll(".btn-down");
downButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const quantityElement = button.nextElementSibling;

        const current = +quantityElement.textContent;

        if (current > 1) {
            quantityElement.textContent = current - 1;
            updateCartInfo();
        }
    });
});

const upButtons = document.querySelectorAll(".btn-up");
upButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const quantityElement = button.previousElementSibling;

        const current = +quantityElement.textContent;

        quantityElement.textContent = current + 1;
        updateCartInfo();
    });
});

// Mã giảm giá

function updateCartInfo() {
    const emptyCart = document.querySelector(".shopping-cart-empty");
    const shoppingCart = document.querySelector(".shopping-cart");
    const cartItems = document.querySelectorAll(".cart-item");
    const totalPriceElement = document.querySelector(".total-price");
    const totalQuantityElement = document.querySelector(".total-quantity");

    if (cartItems.length == 0) {
        emptyCart.style.display = "block";
        shoppingCart.style.display = "none";
    } else {
        emptyCart.style.display = "none";
        shoppingCart.style.display = "table";
    }

    let totalQuantity = 0;
    let totalPrice = 0;

    cartItems.forEach((cartItem) => {
        const price = +cartItem.querySelector(".product-price").textContent;
        const quantity = +cartItem.querySelector(".quantity").textContent;
        const downButton = cartItem.querySelector(".btn-down");
        const total = cartItem.querySelector(".cart-item-price");

        // Cập nhật giá tiền cho từng item
        total.textContent = price * quantity;

        totalQuantity += quantity;
        totalPrice += price * quantity;

        downButton.disabled = quantity == 1;
    });

    totalPriceElement.textContent = totalPrice;
    totalQuantityElement.textContent = totalQuantity;
}

function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || { items: [] };

    if (cart.items.length > 0) {
        cart.items = cart.items.map((item) => ({
            ...products[item.id],
            quantity: item.quantity
        }));

        const items = cart.items
            .map(
                (item) => `
    <tr class="cart-item">
      <td>
        <div class="product-thumbnail">
          <img
            src="${item.thumbnail}"
            alt="${item.title}"
          />
        </div>
      </td>
      <td>
        <div class="product-info">
          <div class="product-title">${item.title}</div>
          <div class="product-price">${item.price}</div>
        </div>
      </td>
      <td>
        <div class="product-quantity">
          <button class="btn-down">Down</button>
          <span class="quantity">${item.quantity}</span>
          <button class="btn-up">Up</button>
        </div>
      </td>
      <td>
        <div class="cart-item-price">${item.price}</div>
      </td>
      <td>
        <div class="cart-item-actions">
          <button>Delete</button>
        </div>
      </td>
    </tr>
    `
            )
            .join("");

        document.querySelector("tbody.cart-items").innerHTML = items;

        updateCartInfo();
    }
}

renderCart();
