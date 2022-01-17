let products = JSON.parse(localStorage.getItem("products"))
  ? JSON.parse(localStorage.getItem("products"))
  : [
      {
        title: "Boruto T-Shirt",
        category: "T-Shirt",
        price: 249.99,
        img: "https://i.etsystatic.com/20186511/r/il/cda98f/3473685066/il_794xN.3473685066_62mq.jpg",
      },
      {
        title: "MHA Squad T",
        category: "T-Shirt",
        price: 229.99,
        img: "https://i.etsystatic.com/32505238/r/il/21fcdb/3573971060/il_794xN.3573971060_rsen.jpg",
      },
      {
        title: "Bleach Hoodie",
        category: "Hoodie",
        price: 279.99,
        img: "https://i.etsystatic.com/24438193/r/il/65be26/3472540263/il_794xN.3472540263_if63.jpg",
      },
      {
        title: "Eren Yaeger Jersey",
        category: "Jersey",
        price: 319.99,
        img: "https://i.etsystatic.com/28172568/r/il/4bbd6f/3098603388/il_794xN.3098603388_60vn.jpg",
      },
      {
        title: "Tokyo Revengers Hoodie",
        category: "Hoodie",
        price: 399.99,
        img: "https://i.etsystatic.com/28994088/r/il/5e33bc/3320815932/il_794xN.3320815932_rwea.jpg",
      },
      {
        title: "Rent A Girlfriend Black Hoodie",
        category: "Hoodie",
        price: 249.99,
        img: "https://i.etsystatic.com/18877495/r/il/d76466/3040062866/il_794xN.3040062866_lkvs.jpg",
      },
      {
        title: "Itachi Green J",
        category: "Jersey",
        price: 399.99,
        img: "https://i.etsystatic.com/27998254/r/il/2755f8/3317862204/il_794xN.3317862204_cek1.jpg",
      },
      {
        title: "Baki Hanma J",
        category: "Jersey",
        price: 269.99,
        img: "https://i.etsystatic.com/27223718/r/il/46937d/3622382915/il_794xN.3622382915_q5r6.jpg",
      },
      {
        title: "Gojo White T",
        category: "T-Shirt",
        price: 229.99,
        img: "https://i.etsystatic.com/21717899/r/il/16ce32/3361173506/il_794xN.3361173506_r1op.jpg",
      },
    ];

let cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

// READ
function readProducts(products) {
  document.querySelector("#products").innerHTML = "";
  products.forEach((product, position) => {
    document.querySelector("#products").innerHTML += `
      <div class="card">
        <img src="${product.img}" class="card-img-top" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">R${product.price}</p>
          <div class="d-flex mb-3">
            <input type="number" class="form-control" value=1 min=1 id="addToCart${position}">
            <button type="button" class="btn btn-secondary ms-3" onclick="addToCart(${position})"><i class="fas fa-cart-plus"></i></button>
          </div>
          
          
          
          </div>
          <div class="d-flex justify-content-end card-footer">
            <button type="button" class="btn btn-primary w-50" data-bs-toggle="modal" data-bs-target="#editProduct${position}" >
              Edit
            </button>
            <button type="button" class="btn btn-danger w-50 ms-3" onclick="deleteProduct(${position})" >
              Delete
            </button>
          </div>
      </div>






      <div
        class="modal fade"
        id="editProduct${position}"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">

                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Edit ${product.title}
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3">
                        <label for="editTitle${position}" class="form-label">Title</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editTitle${position}"
                          id="editTitle${position}"
                          value="${product.title}"/>
                      </div>
                      <div class="mb-3">
                        <label for="editCategory${position}" class="form-label">Category</label>
                        <select
                          class="form-select"
                          name="editCategory${position}"
                          id="editCategory${position}">
                          <option value="T-Shirt">T-Shirt</option>
                          <option value="Hoodie">Hoodie</option>
                          <option value="Jersey">Jersey</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label for="editPrice${position}" class="form-label">Price</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editPrice${position}"
                          id="editPrice${position}"
                          value="${product.price}"/>
                      </div>
                      <div class="mb-3">
                        <label for="editImg${position}" class="form-label">Image URL</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editImg${position}"
                          id="editImg${position}"
                          value="${product.img}"/>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal">
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                        onclick="updateProduct(${position})">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>`;
  });
}

readProducts(products);
showCartBadge();

// CREATE
function createProduct() {
  let title = document.querySelector("#addTitle").value;
  let category = document.querySelector("#addCategory").value;
  let price = document.querySelector("#addPrice").value;
  let img = document.querySelector("#addImg").value;

  try {
    if (!title || !price || !img) throw new Error("Please fill in all fields");
    products.push({
      title,
      category,
      price,
      img,
    });
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}

// UPDATE
function updateProduct(position) {
  let title = document.querySelector(`#editTitle${position}`).value;
  let category = document.querySelector(`#editCategory${position}`).value;
  let price = document.querySelector(`#editPrice${position}`).value;
  let img = document.querySelector(`#editImg${position}`).value;

  try {
    if (!title || !price || !img) throw new Error("Please fill in all fields");
    products[position] = {
      title,
      category,
      price,
      img,
    };
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}

// DELETE
function deleteProduct(position) {
  let confirmation = confirm(
    "Are you sure you want to delete the selected product?"
  );

  if (confirmation) {
    products.splice(position, 1);
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  }
}

// ADD TO CART
function addToCart(position) {
  let qty = document.querySelector(`#addToCart${position}`).value;
  let added = false;
  cart.forEach((product) => {
    if (product.title == products[position].title) {
      alert(
        `You have successfully added ${qty} ${products[position].title} to the cart`
      );
      product.qty = parseInt(product.qty) + parseInt(qty);
      added = true;
    }
  });
  if (!added) {
    cart.push({ ...products[position], qty });
    alert(
      `You have successfully added ${qty} ${products[position].title} to the cart`
    );
  }

  showCartBadge();

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update Cart Badge
function showCartBadge() {
  document.querySelector("#badge").innerHTML = cart ? cart.length : "";
}

// SORT BY CATEGORY
function sortCategory() {
  let category = document.querySelector("#sortCategory").value;

  if (category == "All") {
    return readProducts(products);
  }

  let foundProducts = products.filter((product) => {
    return product.category == category;
  });

  readProducts(foundProducts);
  console.log(foundProducts);
}

// SORT BY NAME

function sortName() {
  let direction = document.querySelector("#sortName").value;

  let sortedProducts = products.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  if (direction == "descending") sortedProducts.reverse();
  console.log(sortedProducts);
  readProducts(products);
}

// SORT BY PRICE

function sortPrice() {
  let direction = document.querySelector("#sortPrice").value;

  let sortedProducts = products.sort((a, b) => a.price - b.price);

  console.log(sortedProducts);

  if (direction == "descending") sortedProducts.reverse();
  readProducts(sortedProducts);
}
