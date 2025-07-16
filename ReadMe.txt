📁 File Structure

ecommerce-frontend/
├── pages/
│   ├── index.js         // Product list UI
│   └── _app.js          // App layout wrapper
├── styles/
│   └── globals.css      // Basic styles
├── .env.local           // API base URL
├── package.json         // Project metadata

🔌 Connected API

    GET /api/products from backend shows products dynamically

    Images, names, and prices are pulled live

🧪 Test It

Run:

npm install
npm run dev

Frontend runs on: http://localhost:3001 (or whatever port Next uses)


🚀 Features Implemented:
Feature	Path	Description
🏠 Product List	/	List all products from backend
📄 Product Detail	/product/[id]	View single product with Add to Cart
🛒 Cart View	/cart	View and remove cart items
🔐 Login	/login	Email/password-based login
📝 Register	/register	Create user account
🗂 Tech Summary:

    🔌 Backend API connected via .env.local

    🛡 Auth via JWT in localStorage

    📦 Cart APIs used for integration

    🧠 Product detail loaded dynamically with route param