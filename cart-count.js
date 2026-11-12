// ===============================
// NOSTRA - CART COUNT
// ===============================


// ===============================
// UPDATE CART COUNT
// ===============================

function updateCartCount() {

    // Get cart from localStorage
    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    // Calculate total quantity
    let count = 0;

    cart.forEach(function (product) {

        const quantity =
            Number(product.quantity) || 1;

        count += quantity;

    });


    // ===============================
    // DESKTOP CART COUNT
    // ===============================

    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {

        cartCount.textContent = count;

    }


    // ===============================
    // MOBILE CART COUNT
    // ===============================

    const mobileCartCount =
        document.getElementById("mobileCartCount");

    if (mobileCartCount) {

        mobileCartCount.textContent = count;

    }

}


// ===============================
// UPDATE WHEN PAGE LOADS
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

    }
);


// ===============================
// UPDATE WHEN CART CHANGES
// ===============================

// Other JavaScript files can call:
// window.updateCartCount();

window.updateCartCount = updateCartCount;