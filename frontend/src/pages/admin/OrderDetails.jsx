import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/common/Loader";

import { getOrderById } from "../../services/order.service";
import { updateOrderStatus } from "../../services/adminOrder.service";

function AdminOrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

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

      toast.success("Order Updated");

      fetchOrder();

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unable to update order"
      );
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <Loader />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-8">
        Order Details
      </h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">

        <h2 className="text-xl font-semibold">
          Customer
        </h2>

        <p>Name : {order.user.name}</p>

        <p>Email : {order.user.email}</p>

        <hr />

        <h2 className="text-xl font-semibold">
          Shipping Address
        </h2>

        <p>
          {order.shippingAddress.address}
        </p>

        <p>
          {order.shippingAddress.city}
        </p>

        <p>
          {order.shippingAddress.postalCode}
        </p>

        <p>
          {order.shippingAddress.country}
        </p>

        <hr />

        <h2 className="text-xl font-semibold">
          Ordered Products
        </h2>

        {order.orderItems.map((item) => (

          <div
            key={item._id}
            className="flex items-center gap-5 border-b py-4"
          >

            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />

            <div>

              <h3>{item.name}</h3>

              <p>
                Qty : {item.quantity}
              </p>

              <p>
                ₹ {item.price}
              </p>

            </div>

          </div>

        ))}

        <hr />

        <div>

          <p>
            Payment : {order.paymentMethod}
          </p>

          <p>
            Total : ₹ {order.totalPrice}
          </p>

        </div>

        <div className="mt-6">

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="border rounded p-3"
          >
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>

          <button
            onClick={handleUpdate}
            className="ml-4 bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Update Status
          </button>

        </div>

      </div>

    </AdminLayout>
  );
}

export default AdminOrderDetails;