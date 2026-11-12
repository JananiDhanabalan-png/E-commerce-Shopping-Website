// Home page JavaScript

// Shop Now button
var shopNowButton = document.querySelector(".header-button");

if (shopNowButton) {
    shopNowButton.addEventListener("click", function () {
        window.location.href = "collection.html";
    });
}
// ==========================================
// NOSTRA - HOME PAGE JAVASCRIPT
// ==========================================

// Main Header Shop Now Button
// ==========================================
// NOSTRA - HOME PAGE JAVASCRIPT
// ==========================================

// ==========================================
// NOSTRA - HOME PAGE JAVASCRIPT
// ==========================================

// Header Shop Now + New Arrival + Most Wanted
// எல்லா Shop Now buttons-ம் collection.htmlக்கு போகும்

var shopNowButtons = document.querySelectorAll(".header-button, .new-arrival-container button");

shopNowButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        window.location.href = "collection.html";

    });

});