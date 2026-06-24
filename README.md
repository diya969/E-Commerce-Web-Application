ShopFront 🛍️
___________________________________________________________________________________________________________________________________
A full-stack e-commerce web application built as a learning project to understand how frontend, backend, and database work together in a real-world app.

⚠️ This is a beginner learning project — not intended for production use.


🧰 Tech Stack

LayerTechnologyFrontendReact 18 + ViteBackendSpring Boot 4 (Java 21)DatabaseMySQL 8AuthJWT (JSON Web Tokens)Image HostingCloudinaryStylingPlain CSS with CSS variables


✨ Features


Authentication — Register and login with JWT-based session management
Product Listing — Browse products by category (Electronic Gadgets, Decorative Items, Sarees, Bangles)
Product Detail Page — View full product info before adding to cart
Shopping Cart — Add items, adjust quantities, remove products
Checkout — Place orders with saved delivery address
User Profile — Edit name and delivery address
Sidebar Navigation — Collapsible category navigation with active state highlighting
Home Page — Hero banner with product collage and category tiles
Animated Order Success — SVG checkmark animation on order placement
Responsive Layout — Works on desktop and tablet screens



🖼️ Images

All product images are hosted on Cloudinary (free tier).

No local image files are needed to run this project — images load directly from Cloudinary's CDN via URLs stored in the database.


🗂️ Project Structure

shopfront/
├── ecommerce-frontend/        # React + Vite frontend
│   ├── src/
│   │   ├── pages/             # Login, Home, Products, ProductDetail, Cart, Checkout, Profile
│   │   ├── components/        # Sidebar, ProductCard
│   │   ├── context/           # AuthContext, CartContext
│   │   └── services/          # api.js (Axios instance + all API calls)
│   └── .env.example
│
└── ecommerce-backend/         # Spring Boot backend
    └── src/main/java/com/ecommerce/shopfront/
        ├── entity/            # User, Product, Order
        ├── repository/        # JPA repositories
        ├── service/           # AuthService, ProductService, OrderService, UserService
        ├── controller/        # AuthController, ProductController, OrderController, UserController
        ├── security/          # JwtUtil, JwtAuthenticationFilter, CustomUserDetailsService
        ├── config/            # SecurityConfig (CORS + JWT filter chain)
        ├── dto/               # Request/Response DTOs
        └── exception/         # GlobalExceptionHandler


🚀 Getting Started

Prerequisites


Node.js 18+
Java 21
MySQL 8
Maven



1. Clone the repository

bashgit clone https://github.com/your-username/shopfront.git
cd shopfront


2. Set up the database

Open MySQL Workbench and run:

sqlCREATE DATABASE IF NOT EXISTS shopfront;

The tables (users, products, orders) will be created automatically by Hibernate when the backend starts (ddl-auto=update).


3. Configure the backend

Copy the example config and fill in your values:

bashcd ecommerce-backend
cp src/main/resources/application.properties.example src/main/resources/application.properties

Edit application.properties:

propertiesspring.datasource.url=jdbc:mysql://localhost:3306/shopfront?createDatabaseIfNotExist=true
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password

jwt.secret=your_random_secret_key_minimum_32_characters
jwt.expiration-ms=86400000

server.port=8080


4. Run the backend

Open the ecommerce-backend folder in IntelliJ IDEA and click Run, or from the terminal:

bashcd ecommerce-backend
./mvnw spring-boot:run

Backend starts at http://localhost:8080


5. Set up the frontend

bashcd ecommerce-frontend
cp .env.example .env
npm install
npm run dev

Frontend starts at http://localhost:5173


6. Seed sample products

After the backend starts (so Hibernate creates the tables), run this in MySQL Workbench to add sample products:

sqlUSE shopfront;

INSERT INTO products (name, price, description, image_url, category) VALUES
('Wireless Mouse', 599.00, 'Ergonomic wireless mouse with USB receiver', 'YOUR_CLOUDINARY_URL', 'Electronic Gadgets'),
('Mechanical Keyboard', 2499.00, 'RGB backlit mechanical keyboard, blue switches', 'YOUR_CLOUDINARY_URL', 'Electronic Gadgets'),
('USB-C Hub', 1299.00, '6-in-1 USB-C hub with HDMI and SD card slot', 'YOUR_CLOUDINARY_URL', 'Electronic Gadgets'),
('Laptop Stand', 899.00, 'Adjustable aluminum laptop stand', 'YOUR_CLOUDINARY_URL', 'Electronic Gadgets'),
('Noise Cancelling Headphones', 4999.00, 'Over-ear headphones with active noise cancellation', 'YOUR_CLOUDINARY_URL', 'Electronic Gadgets'),
('Ceramic Vase', 799.00, 'Hand-painted ceramic vase for home decor', 'YOUR_CLOUDINARY_URL', 'Decorative Items'),
('Wall Clock', 1199.00, 'Minimalist wooden wall clock', 'YOUR_CLOUDINARY_URL', 'Decorative Items'),
('Table Lamp', 1499.00, 'Warm-light ceramic table lamp', 'YOUR_CLOUDINARY_URL', 'Decorative Items'),
('Banarasi Silk Saree', 3499.00, 'Traditional handwoven Banarasi silk saree with zari border', 'YOUR_CLOUDINARY_URL', 'Sarees'),
('Cotton Printed Saree', 1299.00, 'Lightweight daily-wear cotton saree with floral print', 'YOUR_CLOUDINARY_URL', 'Sarees'),
('Gold Plated Bangles Set', 899.00, 'Set of 6 gold-plated traditional bangles', 'YOUR_CLOUDINARY_URL', 'Bangles'),
('Glass Chudi Set', 499.00, 'Colorful glass bangle set, pack of 2', 'YOUR_CLOUDINARY_URL', 'Bangles');

Replace YOUR_CLOUDINARY_URL with your own Cloudinary image URLs, or any public image URL.


🔑 API Endpoints

MethodEndpointAuthDescriptionPOST/api/auth/register❌Register new userPOST/api/auth/login❌Login, returns JWTGET/api/products❌Get all productsGET/api/products/{id}❌Get product by IDPOST/api/orders✅Place an orderGET/api/orders/my✅Get my ordersGET/api/user/profile✅Get profilePUT/api/user/profile✅Update name and address


📚 What I Learned


How to connect a React frontend to a Spring Boot REST API
JWT authentication flow (token generation, filter chain, protected routes)
JPA entities, repositories, and relationships (@ManyToOne, @JoinColumn)
Spring Security configuration (CORS, stateless sessions, route permissions)
React Context API for global state (auth, cart)
React Router with dynamic routes (/products/:category/:id)
CSS variables for consistent theming across components
Hosting images on Cloudinary and referencing them via URL in a database
Debugging real errors: SQL safe mode, Spring Security import paths, JWT filter setup



📸 Screenshots




👩‍💻 Author

Krishna Deepika K

Built as a personal learning project to practise full-stack development with Java Spring Boot and React.
