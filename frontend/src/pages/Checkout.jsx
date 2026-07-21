import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCart } from "../services/cart.service";
import { createOrder } from "../services/order.service";

import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

import toast from "react-hot-toast";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    phone: "",
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCart(data.cart);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        shippingAddress: form,
        paymentMethod: "COD",

        itemsPrice: cart.totalPrice,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: cart.totalPrice,
      };

      const data = await createOrder(orderData);

      toast.success("Order Placed Successfully");

      navigate(`/orders/${data.order._id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to place order"
      );
    }
  };

  if (loading) return <Loader />;

  if (!cart || cart.items.length === 0)
    return <EmptyState message="Cart is empty." />;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">

      <div className="grid lg:grid-cols-2 gap-10">

        {/* Shipping */}

        <div>

          <h2 className="text-2xl font-bold mb-6">
            Shipping Address
          </h2>

          <input
            className="border p-3 rounded w-full mb-4"
            placeholder="Address"
            name="address"
            onChange={handleChange}
          />

          <input
            className="border p-3 rounded w-full mb-4"
            placeholder="City"
            name="city"
            onChange={handleChange}
          />

          <input
            className="border p-3 rounded w-full mb-4"
            placeholder="State"
            name="state"
            onChange={handleChange}
          />

          <input
            className="border p-3 rounded w-full mb-4"
            placeholder="Pincode"
            name="postalCode"
            onChange={handleChange}
          />

          <input
            className="border p-3 rounded w-full"
            placeholder="Phone"
            name="phone"
            onChange={handleChange}
          />

        </div>

        {/* Summary */}

        <div className="bg-white shadow rounded-xl p-6 h-fit">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          {cart.items.map((item) => (

            <div
              key={item.product._id}
              className="flex justify-between mb-3"
            >
              <span>
                {item.product.name} × {item.quantity}
              </span>

              <span>
                ₹ {item.product.price * item.quantity}
              </span>

            </div>

          ))}

          <hr className="my-5" />

          <div className="flex justify-between font-bold text-xl">

            <span>Total</span>

            <span>₹ {cart.totalPrice}</span>

          </div>

          <div className="mt-8">

            <h3 className="font-semibold mb-2">
              Payment Method
            </h3>

            <div className="border rounded p-3 bg-gray-50">
              Cash on Delivery (COD)
            </div>

          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-8 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;