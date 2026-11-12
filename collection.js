// ==========================================
// NOSTRA - COLLECTION.JS
// ==========================================


// ==========================================
// VARIABLES
// ==========================================

var productContainer =
    document.getElementById("products");

var search =
    document.getElementById("search");

var allProducts = [];


// ==========================================
// LOAD PRODUCTS
// ==========================================

function loadProducts() {

    fetch("http://localhost:8080/api/products")

        .then(function(response) {

            console.log(
                "Product API Status:",
                response.status
            );

            if (!response.ok) {

                throw new Error(
                    "HTTP Error: " +
                    response.status
                );

            }

            return response.json();

        })

        .then(function(data) {

            console.log(
                "Products loaded:",
                data
            );

            allProducts = data;

            displayProducts(allProducts);

        })

        .catch(function(error) {

            console.error(
                "Error loading products:",
                error
            );

            productContainer.innerHTML = `

                <div class="error-message">

                    <h3>
                        Unable to load products
                    </h3>

                    <p>
                        Please check whether
                        Spring Boot is running.
                    </p>

                </div>

            `;

        });

}


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts(products) {

    productContainer.innerHTML = "";


    // No products

    if (
        !products ||
        products.length === 0
    ) {

        productContainer.innerHTML = `

            <p>
                No products found
            </p>

        `;

        return;

    }


    // Loop products

    products.forEach(function(product) {

        var productBox =
            document.createElement("div");


        productBox.className =
            "products-box";


        productBox.innerHTML = `

            <img

                src="images/${product.image}"

                alt="${product.name}"

                onclick="openProduct(${product.id})"

                onerror="
                    this.onerror=null;
                    this.src='images/placeholder.jpeg';
                "

            >


            <h3>
                ${product.name}
            </h3>


            <p class="product-price">

                ₹${product.price}

            </p>


            <p>

                ${product.description || ""}

            </p>


            <p>

                Category:
                ${product.category || "Women"}

            </p>


            <button
                onclick="openProduct(${product.id})">

                View Product

            </button>


            <button
                onclick="editProduct(${product.id})">

                Edit

            </button>


            <button
                onclick="deleteProduct(${product.id})">

                Delete

            </button>

        `;


        productContainer.appendChild(
            productBox
        );

    });

}


// ==========================================
// OPEN PRODUCT DETAILS
// ==========================================

function openProduct(id) {

    window.location.href =
        "product.html?id=" + id;

}


// ==========================================
// SEARCH PRODUCTS
// ==========================================

if (search) {

    search.addEventListener(
        "keyup",
        function(event) {

            var enteredValue =
                event.target.value
                    .toLowerCase()
                    .trim();


            var filteredProducts =
                allProducts.filter(
                    function(product) {

                        var productName =
                            product.name || "";


                        var productDescription =
                            product.description || "";


                        var productCategory =
                            product.category || "";


                        return (

                            productName
                                .toLowerCase()
                                .includes(
                                    enteredValue
                                )

                            ||

                            productDescription
                                .toLowerCase()
                                .includes(
                                    enteredValue
                                )

                            ||

                            productCategory
                                .toLowerCase()
                                .includes(
                                    enteredValue
                                )

                        );

                    }
                );


            displayProducts(
                filteredProducts
            );

        }
    );

}


// ==========================================
// ADD PRODUCT
// ==========================================

function addProduct() {

    var name =
        document
            .getElementById("productName")
            .value
            .trim();


    var price =
        document
            .getElementById("productPrice")
            .value
            .trim();


    var image =
        document
            .getElementById("productImage")
            .value
            .trim();


    var description =
        document
            .getElementById("productDescription")
            .value
            .trim();


    var category =
        document
            .getElementById("productCategory")
            .value
            .trim();


    // Validation

    if (
        name === "" ||
        price === "" ||
        image === "" ||
        category === ""
    ) {

        alert(
            "Please fill all required fields"
        );

        return;

    }


    var product = {

        name: name,

        price: Number(price),

        image: image,

        description: description,

        category: category

    };


    // POST request

    fetch(
        "http://localhost:8080/api/products",
        {

            method: "POST",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body:
                JSON.stringify(product)

        }
    )

    .then(function(response) {

        if (!response.ok) {

            throw new Error(
                "Product could not be added"
            );

        }

        return response.json();

    })

    .then(function(data) {

        console.log(
            "Product added:",
            data
        );


        alert(
            "Product added successfully!"
        );


        // Add new product

        allProducts.push(data);


        displayProducts(
            allProducts
        );


        // Clear inputs

        document
            .getElementById("productName")
            .value = "";


        document
            .getElementById("productPrice")
            .value = "";


        document
            .getElementById("productImage")
            .value = "";


        document
            .getElementById("productDescription")
            .value = "";


        document
            .getElementById("productCategory")
            .value = "";

    })

    .catch(function(error) {

        console.error(
            "Error adding product:",
            error
        );


        alert(
            "Unable to add product"
        );

    });

}


// ==========================================
// DELETE PRODUCT
// ==========================================

function deleteProduct(id) {

    var confirmDelete =
        confirm(
            "Are you sure you want to delete this product?"
        );


    if (!confirmDelete) {

        return;

    }


    fetch(
        "http://localhost:8080/api/products/" + id,
        {

            method: "DELETE"

        }
    )

    .then(function(response) {

        if (!response.ok) {

            throw new Error(
                "Product could not be deleted"
            );

        }

        return response.text();

    })

    .then(function(data) {

        console.log(
            "Delete response:",
            data
        );


        alert(
            data ||
            "Product deleted successfully!"
        );


        // Remove from array

        allProducts =
            allProducts.filter(
                function(product) {

                    return product.id !== id;

                }
            );


        // Refresh products

        displayProducts(
            allProducts
        );

    })

    .catch(function(error) {

        console.error(
            "Error deleting product:",
            error
        );


        alert(
            "Unable to delete product"
        );

    });

}


// ==========================================
// EDIT PRODUCT
// ==========================================

function editProduct(id) {

    var product =
        allProducts.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!product) {

        alert(
            "Product not found"
        );

        return;

    }


    // New name

    var newName =
        prompt(
            "Enter product name:",
            product.name
        );


    if (newName === null) {

        return;

    }


    // New price

    var newPrice =
        prompt(
            "Enter product price:",
            product.price
        );


    if (newPrice === null) {

        return;

    }


    // New image

    var newImage =
        prompt(
            "Enter image file name:",
            product.image
        );


    if (newImage === null) {

        return;

    }


    // New description

    var newDescription =
        prompt(
            "Enter description:",
            product.description || ""
        );


    if (newDescription === null) {

        return;

    }


    // New category

    var newCategory =
        prompt(
            "Enter category:",
            product.category || ""
        );


    if (newCategory === null) {

        return;

    }


    // Updated product

    var updatedProduct = {

        name:
            newName.trim(),

        price:
            Number(newPrice),

        image:
            newImage.trim(),

        description:
            newDescription.trim(),

        category:
            newCategory.trim()

    };


    // PUT request

    fetch(
        "http://localhost:8080/api/products/" + id,
        {

            method: "PUT",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body:
                JSON.stringify(
                    updatedProduct
                )

        }
    )

    .then(function(response) {

        if (!response.ok) {

            throw new Error(
                "Product could not be updated"
            );

        }

        return response.json();

    })

    .then(function(data) {

        console.log(
            "Product updated:",
            data
        );


        alert(
            "Product updated successfully!"
        );


        // Update array

        allProducts =
            allProducts.map(
                function(product) {

                    if (
                        product.id === id
                    ) {

                        return data;

                    }

                    return product;

                }
            );


        // Refresh products

        displayProducts(
            allProducts
        );

    })

    .catch(function(error) {

        console.error(
            "Error updating product:",
            error
        );


        alert(
            "Unable to update product"
        );

    });

}


// ==========================================
// START APPLICATION
// ==========================================

loadProducts();