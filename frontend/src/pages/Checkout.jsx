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
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
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
    if (!form.fullName.trim()) return toast.error("Full Name is required");

    if (!form.phone.trim()) return toast.error("Phone Number is required");

    if (!form.street.trim()) return toast.error("Street Address is required");

    if (!form.city.trim()) return toast.error("City is required");

    if (!form.state.trim()) return toast.error("State is required");

    if (!form.postalCode.trim()) return toast.error("Postal Code is required");

    try {
      const orderData = {
        shippingAddress: form,
        paymentMethod: "COD",

        itemsPrice: subtotal,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: subtotal,
      };

      const data = await createOrder(orderData);

      toast.success("Order Placed Successfully");

      navigate(`/orders/${data.order._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to place order");
    }
  };

  if (loading) return <Loader />;

  if (!cart || cart.items.length === 0)
    return <EmptyState message="Cart is empty." />;

  const subtotal = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Shipping */}

        <div>
          <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
          <input
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#4361EE] focus:border-[#4361EE]"
            placeholder="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
          />

          <input
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#4361EE] focus:border-[#4361EE]"
            placeholder="Street Address"
            name="street"
            value={form.street}
            onChange={handleChange}
          />

          <input
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#4361EE] focus:border-[#4361EE]"
            placeholder="City"
            name="city"
            value={form.city}
            onChange={handleChange}
          />

          <input
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#4361EE] focus:border-[#4361EE]"
            placeholder="State"
            name="state"
            value={form.state}
            onChange={handleChange}
          />

          <input
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#4361EE] focus:border-[#4361EE]"
            placeholder="Pincode"
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
          />

          <input
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#4361EE] focus:border-[#4361EE]"
            placeholder="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        {/* Summary */}

        <div className="bg-white shadow rounded-xl p-6 h-fit">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          {cart.items.map((item) => (
            <div key={item.product._id} className="flex justify-between mb-3">
              <span>
                {item.product.name} × {item.quantity}
              </span>

              <span>₹ {item.product.price * item.quantity}</span>
            </div>
          ))}

          <hr className="my-5" />

          <div className="flex justify-between font-bold text-xl">
            <span>Total</span>
            <span>₹ {subtotal}</span>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold mb-2">Payment Method</h3>

            <div className="border rounded p-3 bg-gray-50">
              Cash on Delivery (COD)
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-8 w-full bg-[#4361EE]  text-white py-3 rounded-lg hover:bg-green-700"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
