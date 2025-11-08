# Nexora  - Full Stack E-Commerce Shopping Cart

A modern, full-stack e-commerce shopping cart application built with React, Node.js, Express, and MongoDB. 

This project demonstrates a complete shopping experience with product browsing, cart management, user authentication, and checkout functionality.

##  Tech Stack

### Frontend
- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Vite** - Build tool and dev server
- **CSS3** - Styling with responsive design

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (via Mongoose)
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

---

## Installation & Setup

### Prerequisites
- Node.js 
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd assignment
```

### Step 2: Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `backend` directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/urappname
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/urappname

JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend server will start on `http://localhost:3000`

### Step 3: Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Create a `.env` file in the `frontend` directory if you need to change the API URL:
```env
VITE_API_URL=http://localhost:3000/api
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

### Step 4: Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---

##  User Flow

### 1. **Homepage - Product Browsing**
- Users land on the products page showing a grid of available products
- Each product displays:
  - Product image
  - Product name
  - Price (in ₹)
  - "Add to Cart" button
- Products are paginated (20 per page) with navigation controls
- Users can browse through multiple pages of products

### 2. **Authentication**
- **Sign Up**: New users can create an account by clicking "Sign Up" in the navbar
  - Required fields: Name, Email, Password (min 6 characters)
  - Password confirmation for validation
- **Login**: Existing users can log in with email and password
- After authentication, the navbar shows "Hello, [User Name]" and a logout button

### 3. **Shopping Cart**
- **Adding Items**: Click "Add to Cart" on any product
  - Cart count badge appears on the cart icon in the navbar
  - Items are saved to the user's cart in the database
- **Viewing Cart**: Click the "Cart" link in the navbar
  - Displays all added items with:
    - Product image
    - Product name
    - Price per unit
    - Quantity
    - Subtotal for each item
  - Shows total cart value at the bottom
  - "Remove" button for each item to delete from cart

### 4. **Checkout Process**
- Click "Proceed to Checkout" button in the cart
- Fill in checkout form:
  - Name
  - Email
- Click "Place Order" to complete the purchase
- **Order Confirmation**:
  - Success message: "✓ Order Placed Successfully!"
  - "Download Invoice" button to download a text file invoice
  - "Continue Shopping" button to return to products
- Cart is cleared after successful checkout

### 5. **Navigation**
- **Navbar** includes:
  - "Vibe Commerce" logo (links to home)
  - "Products" link
  - "Cart" link with item count badge
  - Authentication links (Login/Sign Up) or user info (when logged in)
  - Logout button (when authenticated)

---

## Features

### Core Features
-  **Product Catalog**
  - Display 25+ mock products
  - Pagination (20 products per page)
  - Responsive product grid layout
  - Lazy loading images with error handling

-  **Shopping Cart**
  - Add products to cart
  - View cart with all items
  - Update quantities (by adding same product)
  - Remove items from cart
  - Real-time cart count badge
  - Persistent cart (saved to database)

-  **User Authentication**
  - User registration (Sign Up)
  - User login
  - Secure password hashing
  - JWT-based session management
  - Protected cart routes
  - Logout functionality

-  **Checkout System**
  - Checkout form with validation
  - Order processing
  - Invoice generation
  - Invoice download (as .txt file)
  - Order confirmation page

-  **UI/UX Features**
  - Modern, responsive design
  - Maroon color theme
  - Smooth animations and transitions
  - Loading states
  - Error handling with user-friendly messages
  - Mobile-friendly layout

### Technical Features
- RESTful API architecture
- MongoDB database integration
- Cookie-based authentication
- CORS configuration
- Error handling middleware
- Responsive CSS design
- Lazy image loading
- Form validation

---

##  Future Works

### Planned Enhancements

1. **Product Management**
   - Product search and filtering
   - Product categories/tags
   - Product sorting (price, name, etc.)
   - Product reviews and ratings
   - Product detail pages with more information

2. **Enhanced Cart Features**
   - Quantity update controls (+/- buttons)
   - Save for later functionality
   - Cart persistence across sessions
   - Multiple cart management

3. **User Features**
   - User profile page
   - Order history
   - Wishlist/Favorites
   - Address management
   - Password reset functionality


4. **Enhanced Checkout**
   - Shipping address form
   - Multiple shipping options
   - Order tracking
   - Email notifications
   - PDF invoice generation



---

##  Project Structure

```
assignment/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── lib/             # Utilities and DB connection
│   │   └── server.js        # Entry point
│   ├── package.json
│   └── .env                 # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable components
│   │   ├── services/        # API services
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── vite.config.js
│
└── readme.md
```

---

##  API Endpoints

### Products
- `GET /api/products` - Get all products (with pagination)
  - Query params: `page`, `limit`

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
  - Body: `{ productId, qty }`
- `DELETE /api/cart/:id` - Remove item from cart

### Authentication
- `POST /api/auth/signup` - Register new user
  - Body: `{ name, email, password }`
- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
- `POST /api/auth/logout` - Logout user

### Checkout
- `POST /api/checkout` - Process checkout
  - Body: `{ user: { name, email }, cartItems }`

---

##  Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify `.env` file exists with correct `MONGODB_URI`
- Ensure port 3000 is not in use

### Frontend can't connect to backend
- Verify backend is running on port 3000
- Check CORS configuration in `backend/src/server.js`
- Verify API URL in `frontend/src/services/api.js`

### Images not loading
- Check internet connection (images load from external sources)
- Verify image URLs in product data
- Check browser console for CORS errors

### Authentication issues
- Clear browser cookies
- Verify JWT_SECRET in `.env` file
- Check MongoDB connection

---

##  License

This project is created for educational/demonstration purposes.

---

##  Development

### Running in Development Mode

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```


---

## Video Demo

Watch the application in action:

[ Click here to view the video demo](https://www.awesomescreenshot.com/video/46168235?key=46477f009e216a48463c8105fa78ef16)






**Built with love for Nexora**

