import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import Categories from "./pages/admin/Categories";
import Orders from "./pages/admin/Orders";
import AddCategory from "./pages/admin/AddCategory";
import EditCategory from "./pages/admin/EditCategory";
import Products from "./pages/Products";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<MyOrders />} />
      <Route path="/orders/:id" element={<OrderDetails />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/products" element={<Products />} />

      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/products/add" element={<AddProduct />} />
      <Route path="/admin/products/edit/:id" element={<EditProduct />} />
      <Route path="/admin/categories" element={<Categories />} />
      <Route path="/admin/orders" element={<Orders />} />
      <Route path="/admin/categories/add" element={<AddCategory />} />
      <Route path="/admin/categories/edit/:id" element={<EditCategory />} />

      <Route path="/admin/orders/:id" element={<OrderDetails />} />
    </Routes>
  );
}

export default App;
