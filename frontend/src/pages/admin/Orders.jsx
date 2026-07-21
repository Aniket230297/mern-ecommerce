import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

import { getAllOrders } from "../../services/adminOrder.service";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data.orders);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <Loader />
      </AdminLayout>
    );
  }

  if (orders.length === 0) {
    return (
      <AdminLayout>
        <EmptyState message="No orders found." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-8">
        Orders
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="w-full min-w-[900px]">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-4">Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order._id}
                className="border-t text-center"
              >

                <td className="p-4">
                  {order.user?.name}
                </td>

                <td>
                  ₹ {order.totalPrice}
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm
                    ${
                      order.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.orderStatus === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : order.orderStatus === "Processing"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.orderStatus}
                  </span>

                </td>

                <td>
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td>

                  <Link
                    to={`/admin/orders/${order._id}`}
                    className="text-blue-600"
                  >
                    View
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}

export default Orders;