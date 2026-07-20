import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { getOrders } from "../../services/order.service";

import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";
import StatusBadge from "./StatusBadge";

function OrderTable() {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {

    try {

      const data = await getOrders();

      setOrders(data.orders);

    } catch (error) {

      toast.error("Unable to fetch orders");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Loader />;

  if (orders.length === 0)
    return <EmptyState message="No orders found." />;

  return (

    <div className="overflow-x-auto">

      <table className="w-full bg-white rounded-lg shadow">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4">Customer</th>

            <th className="p-4">Amount</th>

            <th className="p-4">Status</th>

            <th className="p-4">Date</th>

            <th className="p-4">Action</th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr
              key={order._id}
              className="border-t text-center"
            >

              <td>{order.user?.name}</td>

              <td>₹ {order.totalPrice}</td>

              <td>

                <StatusBadge
                  status={order.orderStatus}
                />

              </td>

              <td>

                {new Date(
                  order.createdAt
                ).toLocaleDateString()}

              </td>

              <td>

                <Link
                  to={`/admin/orders/${order._id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  View
                </Link>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default OrderTable;