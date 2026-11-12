function placeOrder() {

    // ===============================
    // GET CUSTOMER DETAILS
    // ===============================

    const name = document.getElementById("customerName").value.trim();
    const email = document.getElementById("customerEmail").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const city = document.getElementById("customerCity").value.trim();
    const pincode = document.getElementById("customerPincode").value.trim();


    // ===============================
    // VALIDATE CUSTOMER DETAILS
    // ===============================

    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        address === "" ||
        city === "" ||
        pincode === ""
    ) {
        alert("Please fill all customer details");
        return;
    }


    // ===============================
    // GET CART FROM LOCAL STORAGE
    // ===============================

    const cart = JSON.parse(localStorage.getItem("cart")) || [];


    // ===============================
    // CHECK CART
    // ===============================

    if (cart.length === 0) {

        alert("Your cart is empty");

        window.location.href = "collection.html";

        return;
    }


    // ===============================
    // CALCULATE TOTAL
    // ===============================

    let total = 0;

    cart.forEach(function (product) {

        const quantity = Number(product.quantity) || 1;
        const price = Number(product.price) || 0;

        total += price * quantity;

    });


    // ===============================
    // CREATE ORDER ITEMS
    // ===============================

    const items = [];

    cart.forEach(function (product) {

        const item = {

            productId: Number(product.id),

            productName: product.name,

            price: Number(product.price),

            quantity: Number(product.quantity) || 1

        };

        items.push(item);

    });


    // ===============================
    // CREATE ORDER OBJECT
    // ===============================

    const order = {

        customerName: name,

        customerEmail: email,

        customerPhone: phone,

        customerAddress: address,

        customerCity: city,

        customerPincode: pincode,

        totalAmount: total,

        items: items

    };


    // ===============================
    // CHECK CONSOLE
    // ===============================

    console.log("Order sending to backend:");
    console.log(order);


    // ===============================
    // SEND ORDER TO SPRING BOOT
    // ===============================

    fetch("http://localhost:8080/api/orders", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(order)

    })


    // ===============================
    // RESPONSE
    // ===============================

    .then(function (response) {

        if (!response.ok) {

            throw new Error("Order could not be saved");

        }

        return response.json();

    })


    // ===============================
    // ORDER SUCCESS
    // ===============================

    .then(function (data) {

        console.log("Order saved successfully:");
        console.log(data);


        // Success message

        alert(
            "Order placed successfully!\n\n" +
            "Order ID: " + data.id +
            "\nTotal Amount: ₹" + data.totalAmount
        );


        // ===============================
        // CLEAR CART
        // ===============================

        localStorage.removeItem("cart");


        // ===============================
        // UPDATE CART COUNT
        // ===============================

        if (typeof updateCartCount === "function") {

            updateCartCount();

        }


        // ===============================
        // GO TO ORDERS PAGE
        // ===============================

        window.location.href = "orders.html";

    })


    // ===============================
    // ERROR
    // ===============================

    .catch(function (error) {

        console.error(
            "Error placing order:",
            error
        );

        alert(
            "Unable to place order.\nPlease try again."
        );

    });

}