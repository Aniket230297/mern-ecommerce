import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getCart,
  updateCartQuantity,
  removeCartItem,
  clearCart,
} from "../services/cart.service";

import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import toast from "react-hot-toast";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCart(data.cart);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleIncrease = async (item) => {
    try {
      await updateCartQuantity(item.product._id, item.quantity + 1);
      fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update cart");
    }
  };

  const handleDecrease = async (item) => {
    if (item.quantity === 1) return;

    try {
      await updateCartQuantity(item.product._id, item.quantity - 1);
      fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update cart");
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeCartItem(productId);
      toast.success("Item removed");
      fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to remove item");
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      toast.success("Cart cleared");
      fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to clear cart");
    }
  };

  if (loading) return <Loader />;

  if (!cart || cart.items.length === 0) {
    return <EmptyState message="Your cart is empty." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">
        {/* Shopping Cart ({cart.items.length} Items) */}
      </h1>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Shopping Cart ({cart.items.length} Items)
        </h1>

        <button
          onClick={handleClearCart}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {cart.items.map((item) => (
            <div
              key={item.product._id}
              className="flex flex-col sm:flex-row gap-4 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-5"
            >
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-32 h-32 object-cover rounded"
              />

              <div className="flex-1">
                <h2 className="font-semibold text-xl">{item.product.name}</h2>

                <p className="text-blue-600 font-bold mt-2">
                  ₹ {item.product.price}
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => handleDecrease(item)}
                    className="px-3 py-1 border rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    disabled={item.quantity >= item.product.stock}
                    onClick={() => handleIncrease(item)}
                    className={`px-3 py-1 border rounded ${
                      item.quantity >= item.product.stock
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemove(item.product._id)}
                  className="text-red-500 mt-4"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="flex justify-between mb-4 text-gray-600">
            <span>Items</span>
            <span>{cart.items.length}</span>
          </div>

          <div className="flex justify-between mb-4 text-gray-600">
            <span>Subtotal</span>

            <span>
              ₹{" "}
              {cart.items.reduce(
                (total, item) => total + item.product.price * item.quantity,
                0,
              )}
            </span>
          </div>

          <div className="flex justify-between mb-4 text-gray-600">
            <span>Shipping</span>

            <span className="text-green-600 font-semibold">Free</span>
          </div>

          <hr className="my-5" />

          {cart.items.map((item) => (
            <div
              key={item.product._id}
              className="flex justify-between text-sm mb-3"
            >
              <span className="truncate mr-3">
                {item.product.name} × {item.quantity}
              </span>

              <span>₹ {item.product.price * item.quantity}</span>
            </div>
          ))}

          <hr className="my-5" />

          <div className="flex justify-between text-2xl font-bold">
            <span>Total</span>

            <span className="text-[#4361EE]">
              ₹{" "}
              {cart.items.reduce(
                (total, item) => total + item.product.price * item.quantity,
                0,
              )}
            </span>
          </div>

          <Link
            to="/checkout"
            className="block mt-6 text-center bg-[#4361EE] hover:bg-[#3A56D4] text-white py-3 rounded-xl font-semibold transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
