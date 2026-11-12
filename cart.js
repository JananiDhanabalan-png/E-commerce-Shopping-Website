var cartContainer = document.getElementById("cartContainer");
var cartTotal = document.getElementById("cartTotal");

var cart = JSON.parse(localStorage.getItem("cart")) || [];


// ===============================
// DISPLAY CART
// ===============================

function displayCart() {

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML =
            "<p>Your cart is empty.</p>";

        cartTotal.textContent = "0";

        return;
    }


    var total = 0;


    cart.forEach(function(product, index) {

        // Quantity

        if (!product.quantity) {
            product.quantity = 1;
        }


        var productTotal =
            Number(product.price) * product.quantity;


        total = total + productTotal;


        var cartBox =
            document.createElement("div");

        cartBox.className = "cart-box";


        cartBox.innerHTML = `

            <img
                src="images/${product.image}"
                alt="${product.name}"
            >

            <div class="cart-product-info">

                <h2>
                    ${product.name}
                </h2>

                <p>
                    Price: ₹${product.price}
                </p>


                <div class="quantity-box">

                    <button
                        onclick="decreaseQuantity(${index})">
                        -
                    </button>

                    <span>
                        ${product.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>


                <p>
                    Product Total:
                    ₹${productTotal}
                </p>


                <button
                    onclick="removeFromCart(${index})">
                    Remove
                </button>

            </div>

        `;


        cartContainer.appendChild(cartBox);

    });


    cartTotal.textContent = total;


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ===============================
// INCREASE QUANTITY
// ===============================

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

    displayCart();

}


// ===============================
// DECREASE QUANTITY
// ===============================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    }

    saveCart();

    displayCart();

}


// ===============================
// REMOVE PRODUCT
// ===============================

function removeFromCart(index) {

    var confirmDelete =
        confirm("Remove this product from cart?");


    if (!confirmDelete) {
        return;
    }


    cart.splice(index, 1);

    saveCart();

    displayCart();

}


// ===============================
// SAVE CART
// ===============================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ===============================
// CHECKOUT
// ===============================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty");

        return;
    }

    window.location.href = "checkout.html";
}


// ===============================
// LOAD CART
// ===============================

displayCart();