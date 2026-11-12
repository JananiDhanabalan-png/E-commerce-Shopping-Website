document.addEventListener("DOMContentLoaded", function () {

    loadOrders();

});


function loadOrders() {

    fetch("http://localhost:8080/api/orders")

        .then(function (response) {

            if (!response.ok) {
                throw new Error("Failed to load orders");
            }

            return response.json();

        })

        .then(function (orders) {

            console.log("Orders received:");
            console.log(orders);

            displayOrders(orders);

        })

        .catch(function (error) {

            console.error("Error loading orders:", error);

            document.getElementById("ordersContainer").innerHTML = `
                <div class="error-message">

                    <h3>Unable to load orders</h3>

                    <p>Please try again later.</p>

                </div>
            `;

        });

}


/* =========================
   DISPLAY ORDERS
========================= */

function displayOrders(orders) {

    const container = document.getElementById("ordersContainer");

    container.innerHTML = "";


    // No orders

    if (!orders || orders.length === 0) {

        container.innerHTML = `
            <div class="no-orders">

                <h3>No Orders Found</h3>

                <p>You have not placed any orders yet.</p>

                <a href="collection.html">
                    Continue Shopping
                </a>

            </div>
        `;

        return;
    }


    // Display orders

    orders.forEach(function (order) {

        let itemsHTML = "";


        // Order items

        if (order.items && order.items.length > 0) {

            order.items.forEach(function (item) {

                itemsHTML += `

                    <div class="order-item">

                        <div class="item-details">

                            <h4>
                                ${item.productName}
                            </h4>

                            <p>
                                Product ID: ${item.productId}
                            </p>

                        </div>


                        <div class="item-price">

                            <p>
                                Price: ₹${item.price}
                            </p>

                            <p>
                                Quantity: ${item.quantity}
                            </p>

                            <p>
                                Subtotal:
                                ₹${item.price * item.quantity}
                            </p>

                        </div>

                    </div>

                `;

            });

        } else {

            itemsHTML = `

                <p class="no-items">
                    No product details available
                </p>

            `;

        }


        /* =========================
           ORDER STATUS
        ========================= */

        const status = order.status || "PLACED";


        let cancelButton = "";


        if (status !== "CANCELLED") {

            cancelButton = `

                <button
                    class="cancel-order-button"
                    onclick="cancelOrder(${order.id})">

                    Cancel Order

                </button>

            `;

        }


        /* =========================
           ORDER CARD
        ========================= */

        const orderCard = `

            <div class="order-card">

                <div class="order-header">

                    <h3>
                        Order #${order.id}
                    </h3>

                    <span class="order-status">
                        ${status}
                    </span>

                </div>


                <div class="customer-details">

                    <h4>Customer Details</h4>

                    <p>
                        <strong>Name:</strong>
                        ${order.customerName}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        ${order.customerEmail}
                    </p>

                    <p>
                        <strong>Phone:</strong>
                        ${order.customerPhone}
                    </p>

                    <p>
                        <strong>Address:</strong>
                        ${order.customerAddress},
                        ${order.customerCity}
                    </p>

                    <p>
                        <strong>Pincode:</strong>
                        ${order.customerPincode}
                    </p>

                </div>


                <div class="products-section">

                    <h4>Ordered Products</h4>

                    ${itemsHTML}

                </div>


                <div class="order-total">

                    <span>
                        Total Amount
                    </span>

                    <strong>
                        ₹${order.totalAmount}
                    </strong>

                </div>


                <div class="order-actions">

                    ${cancelButton}

                </div>

            </div>

        `;


        container.innerHTML += orderCard;

    });

}


/* =========================
   CANCEL ORDER
========================= */

function cancelOrder(orderId) {

    const confirmCancel = confirm(
        "Are you sure you want to cancel this order?"
    );


    if (!confirmCancel) {

        return;

    }


    fetch(`http://localhost:8080/api/orders/${orderId}/cancel`, {

        method: "PUT"

    })

        .then(function (response) {

            if (!response.ok) {

                throw new Error("Failed to cancel order");

            }

            return response.json();

        })

        .then(function (updatedOrder) {

            console.log("Order cancelled:", updatedOrder);

            alert("Order cancelled successfully!");

            // Reload orders
            loadOrders();

        })

        .catch(function (error) {

            console.error("Cancel order error:", error);

            alert(
                "Unable to cancel order. Please try again."
            );

        });

}