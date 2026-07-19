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

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>

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
              className="flex flex-col sm:flex-row gap-4 bg-white shadow rounded-xl p-4"
            >

              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-32 h-32 object-cover rounded"
              />

              <div className="flex-1">

                <h2 className="font-semibold text-xl">
                  {item.product.name}
                </h2>

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
                    onClick={() => handleIncrease(item)}
                    className="px-3 py-1 border rounded"
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

        <div className="bg-white shadow rounded-xl p-6 h-fit">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between mb-3">
            <span>Subtotal</span>
            <span>₹ {cart.totalPrice}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>₹ {cart.totalPrice}</span>
          </div>

          <Link
            to="/checkout"
            className="block text-center mt-6 bg-blue-600 text-white py-3 rounded-lg"
          >
            Proceed to Checkout
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Cart;