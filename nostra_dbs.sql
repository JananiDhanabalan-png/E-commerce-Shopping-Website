CREATE DATABASE nostra_dbs;
USE nostra_dbs;
CREATE TABLE productss (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    category VARCHAR(100)
);
INSERT INTO productss (name, price, image, category) VALUES
('Orange Combo', 999, 'odress.jpeg', 'Combo'),
('Black Frog', 799, 'black1.jpeg', 'Frog'),
('Blue Maxi', 899, 'blue1.jpeg', 'Maxi'),
('Blue Court Suit', 1099, 'blue2.jpeg', 'Court Suit'),
('Green Court Suit Combo', 1199, 'green1.jpeg', 'Combo'),
('Green Maxi', 899, 'green2.jpeg', 'Maxi'),
('White Court Suit', 1099, 'white1.jpeg', 'Court Suit'),
('White Anarkali', 999, 'white2.jpeg', 'Anarkali'),
('Red Frog', 799, 'red-frog.jpeg', 'Frog'),
('Red Court Suit', 1099, 'red-suit.jpeg', 'Court Suit'),
('Yellow Saree', 1299, 'yellow-saree.jpeg', 'Saree'),
('Yellow Kurtha', 699, 'yellow-kurtha.jpeg', 'Kurtha'),
('Multicolour Maxi', 999, 'multicolour-maxi.jpeg', 'Maxi'),
('Formal Pant Shirt', 1199, 'formal-pant-shirt.jpeg', 'Formal Wear'),
('Purple Maxi', 899, 'purple-maxi.jpeg', 'Maxi');

SELECT * FROM productss;