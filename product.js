// ===============================
// GET PRODUCT ID FROM URL
// ===============================

var urlParams = new URLSearchParams(window.location.search);

var productId = urlParams.get("id");


// ===============================
// GET PRODUCT DETAILS
// ===============================

fetch("http://localhost:8080/api/products/" + productId)

    .then(function(response) {

        return response.json();

    })

    .then(function(product) {

        console.log(product);


        // Product Image

        document.getElementById("productImage").src =
            "images/" + product.image;


        // Product Name

        document.getElementById("productName").textContent =
            product.name;


        // Product Price

        document.getElementById("productPrice").textContent =
            "₹" + product.price;


        // Product Description

        document.getElementById("productDescription").textContent =
            product.description || "No description available";


        // ===============================
        // ADD TO CART
        // ===============================

        document
            .getElementById("addToCart")
            .addEventListener("click", function() {


                // Get existing cart

                var cart =
                    JSON.parse(localStorage.getItem("cart")) || [];


                // Product object

                var cartProduct = {

                    id: product.id,

                    name: product.name,

                    price: product.price,

                    image: product.image,

                    description: product.description || ""

                };


                // Add product to cart

                cart.push(cartProduct);


                // Save cart

                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );


                // Message

                alert("Product added to cart successfully!");


            });

    })

    .catch(function(error) {

        console.log(
            "Error loading product:",
            error
        );

    });