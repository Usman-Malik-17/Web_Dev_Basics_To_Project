const productList = document.querySelector("#product-list");
const cartItems = document.querySelector("#cart-items");

const emptyCart = document.querySelector("#empty-cart");
const cartTotal = document.querySelector("#cart-total");
const totalPrice = document.querySelector("#total-price");
const checkoutBtn = document.querySelector("#checkout-btn");

let total = 0;

const products = [
  {
    name: "Product 1",
    price: 29.99,
  },
  {
    name: "Product 2",
    price: 19.99,
  },
  {
    name: "Product 1",
    price: 49.99,
  },
];

addProducts(products);

function addProducts(products) {
  products.forEach((element) => {
    const product = document.createElement("div");
    product.classList.add("product");

    const info = document.createElement("p");
    info.textContent = `${element.name} - $${element.price}`;

    const btn = document.createElement("button");
    btn.textContent = "Add To Cart";

    product.appendChild(info);
    product.appendChild(btn);
    productList.appendChild(product);

    btn.addEventListener("click", () => {
      addToCart(info);
      cartPrice(element.price);
    });
  });
}

function addToCart(info) {
  const infoClone = info.cloneNode(true);
  cartItems.appendChild(infoClone);
  emptyCart.classList.add("hidden");
}

function cartPrice(elementPrice) {
  total += elementPrice;
  totalPrice.textContent = `$${total.toFixed(2)}`; // ✅
  cartTotal.classList.remove("hidden");
}
