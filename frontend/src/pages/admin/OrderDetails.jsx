import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/common/Loader";

import {
  getOrderById,
  updateOrderStatus,
} from "../../services/order.service";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  const fetchOrder = async () => {
    try {
      const data = await getOrderById(id);

      setOrder(data.order);
      setStatus(data.order.orderStatus);

    } catch (error) {
      toast.error("Unable to load order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await updateOrderStatus(id, status);

      toast.success("Order updated");

      fetchOrder();

    } catch (error) {
      toast.error("Update failed");
    }
  };

  if (loading) return <Loader />;

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-8">
        Order Details
      </h1>

      {/* Customer */}

      <div className="bg-white rounded-lg shadow p-6 mb-6">

        <h2 className="font-bold text-xl mb-4">
          Customer
        </h2>

        <p>
          <strong>Name:</strong> {order.user.name}
        </p>

        <p>
          <strong>Email:</strong> {order.user.email}
        </p>

      </div>

      {/* Shipping */}

      <div className="bg-white rounded-lg shadow p-6 mb-6">

        <h2 className="font-bold text-xl mb-4">
          Shipping Address
        </h2>

        <p>{order.shippingAddress.fullName}</p>

        <p>{order.shippingAddress.phone}</p>

        <p>{order.shippingAddress.street}</p>

        <p>
          {order.shippingAddress.city},{" "}
          {order.shippingAddress.state}
        </p>

        <p>{order.shippingAddress.country}</p>

        <p>{order.shippingAddress.postalCode}</p>

      </div>

      {/* Products */}

      <div className="bg-white rounded-lg shadow p-6 mb-6">

        <h2 className="font-bold text-xl mb-4">
          Ordered Products
        </h2>

        {order.orderItems.map((item) => (

          <div
            key={item.product._id}
            className="flex items-center gap-4 border-b py-4"
          >

            <img
              src={item.image}
              alt={item.name}
              className="h-16 w-16 object-cover rounded"
            />

            <div className="flex-1">

              <h3 className="font-semibold">
                {item.name}
              </h3>

              <p>
                Qty: {item.quantity}
              </p>

            </div>

            <p>
              ₹ {item.price}
            </p>

          </div>

        ))}

      </div>

      {/* Summary */}

      <div className="bg-white rounded-lg shadow p-6 mb-6">

        <p><strong>Items:</strong> ₹ {order.itemsPrice}</p>

        <p><strong>Shipping:</strong> ₹ {order.shippingPrice}</p>

        <p><strong>Tax:</strong> ₹ {order.taxPrice}</p>

        <p className="font-bold text-xl">
          Total: ₹ {order.totalPrice}
        </p>

        <p className="mt-3">
          <strong>Payment:</strong> {order.paymentMethod}
        </p>

      </div>

      {/* Status */}

      <div className="bg-white rounded-lg shadow p-6">

        <h2 className="font-bold mb-4">
          Update Status
        </h2>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="border p-3 rounded w-full"
        >

          <option>Pending</option>
          <option>Confirmed</option>
          <option>Packed</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>

        </select>

        <button
          onClick={handleUpdate}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Update Status
        </button>

      </div>

    </AdminLayout>
  );
}

export default OrderDetails;