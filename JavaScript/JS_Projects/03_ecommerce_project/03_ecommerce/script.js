const productList = document.querySelector("#product-list");
const cartItems = document.querySelector("#cart-items");

const emptyCart = document.querySelector("#empty-cart");
const cartTotal = document.querySelector("#cart-total");
const totalPrice = document.querySelector("#total-price");
const checkoutBtn = document.querySelector("#checkout-btn");

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 29.99,
  },
  {
    id: 2,
    name: "Product 2",
    price: 19.99,
  },
  {
    id: 3,
    name: "Product 3",
    price: 49.99,
  },
];
const cartProducts = [];

products.forEach((element) => {
  const product = document.createElement("div");
  product.classList.add("product");

  const info = document.createElement("p");
  info.textContent = `${element.name} - $${element.price}`;

  const btn = document.createElement("button");
  btn.textContent = "Add To Cart";
  btn.id = element.id;

  product.appendChild(info);
  product.appendChild(btn);
  productList.appendChild(product);
});
productList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const product = products.find(
      (element) => parseInt(e.target.id) === element.id,
    );
    addToCart(product);
  }
});

function addToCart(product) {
  cartProducts.push(product);
  renderCart();
}

function renderCart() {
  cartItems.innerText = "";
  if (cartProducts) {
    cartProducts.forEach((product) => {
      const div = document.createElement("div");
      div.innerHTML = `${product.name} - ${product.price}`;
      cartItems.appendChild(div);
    });
  } else {
    totalPrice.textContent = `$${0.0}`;
  }
  cartPrice();
}

function cartPrice() {
  let total = 0;
  cartProducts.forEach((elem) => {
    total += elem.price;
  });
  totalPrice.textContent = `$${total.toFixed(2)}`;
  cartTotal.classList.remove("hidden");
}

checkoutBtn.addEventListener("click", (params) => {
  cartProducts.length = 0;
  renderCart("");
});
