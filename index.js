// import { showAlert } from "./lib";

window.onload = function () {
  const overlay = document.querySelector(".overlay");
  const cart_icon = document.querySelector(".cart");
  const cart_count = document.querySelector("#cart-count");
  function onCartClick(event) {
    overlay.style.display = "block";
  }

  cart_icon.addEventListener("click", onCartClick);

  let items = document.getElementById("items");

  let cart = [];
  let cart_container = document.getElementById("cart-container");

  function deleteItem(id) {
    const filterItem = cart.filter((item) => {
      return item.id != id;
    });

    cart = filterItem;
    showCart();
    cart_count.textContent = cart.length;
    console.log(cart, id);
    // console.log(filterItem, "after filter");
  }
  function addToCart(item) {
    cart.push(item);

    cart_count.textContent = cart.length;
    // save the cart inside localstorage
    localStorage.setItem("cartItems", JSON.stringify(cart));
    showCart();
  }
  function showCart() {
    cart_container.innerHTML = "";
    let SavedCart = localStorage.getItem("cartItems");
    SavedCart = JSON.parse(SavedCart);
    if (SavedCart) {
      SavedCart.forEach((cart_item) => {
        const item = document.createElement("div");
        item.textContent = cart_item.title;
        item.classList = "cart_item_css";
        const delete_btn = document.createElement("button");
        delete_btn.textContent = "Delete";
        delete_btn.addEventListener("click", () => {
          deleteItem(cart_item.id);
        });
        item.appendChild(delete_btn);
        cart_container.appendChild(item);
      });
    }
  }
  showCart();

  fetch("https://fakestoreapi.com/products")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      res.forEach((product) => {
        // create the card div
        const card = document.createElement("div");
        // add class to the card div
        card.classList = "card";

        // create the name div
        const cardName = document.createElement("div");
        // add class to the card name div
        cardName.classList = "card-name";
        // create p taqs
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        // give them content
        p1.textContent = product.title;
        p2.textContent = product.price;
        p1.classList = "heado";
        p2.classList = "heado";

        // adding the p tags to the parent div
        cardName.appendChild(p1);
        cardName.appendChild(p2);
        // create the image tag
        const productImg = document.createElement("img");
        productImg.src = product.image;
        productImg.id = "img";
        const button = document.createElement("button");
        button.textContent = "Add to Cart";

        button.addEventListener("click", () => {
          addToCart(product);
        });
        // create stars icon div contaienr
        const starsIcon = document.createElement("div");
        starsIcon.classList = "stars-icon";

        const star1 = document.createElement("img");
        const star2 = document.createElement("img");
        const star3 = document.createElement("img");
        const star4 = document.createElement("img");
        const star5 = document.createElement("img");
        const p = document.createElement("p");

        p.textContent = "(121)";
        star1.src = "./images/star.png";
        star2.src = "./images/star.png";
        star3.src = "./images/star.png";
        star4.src = "./images/star.png";
        star5.src = "./images/star.png";

        starsIcon.appendChild(star1);
        starsIcon.appendChild(star2);
        starsIcon.appendChild(star3);
        starsIcon.appendChild(star4);
        starsIcon.appendChild(star5);
        starsIcon.appendChild(p);

        // add img to the card div
        card.appendChild(productImg);
        // add the card name div to the card div
        card.appendChild(cardName);
        // add button to the card div.
        card.appendChild(starsIcon);
        card.appendChild(button);
        items.appendChild(card);
      });
    })
    .catch((error) => {});
};
