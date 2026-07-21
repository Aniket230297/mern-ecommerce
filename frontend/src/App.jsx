import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";

import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";

import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";

import Categories from "./pages/admin/Categories";
import AddCategory from "./pages/admin/AddCategory";
import EditCategory from "./pages/admin/EditCategory";

import Orders from "./pages/admin/Orders";
import AdminOrderDetails from "./pages/admin/OrderDetails";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <Layout>
      <Routes>
        {/* ---------- Public Routes ---------- */}

        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* ---------- Customer Protected ---------- */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        {/* ---------- Admin Protected ---------- */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products/add"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products/edit/:id"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <AdminRoute>
              <Categories />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/categories/add"
          element={
            <AdminRoute>
              <AddCategory />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/categories/edit/:id"
          element={
            <AdminRoute>
              <EditCategory />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <Orders />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders/:id"
          element={
            <AdminRoute>
              <AdminOrderDetails />
            </AdminRoute>
          }
        />

        {/* ---------- 404 ---------- */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
