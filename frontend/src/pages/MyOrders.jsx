import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getMyOrders } from "../services/order.service";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data.orders);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Loader />;

  if (orders.length === 0) {
    return <EmptyState message="No orders found." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-8">
        My Orders
      </h1>

      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order._id}
            className="bg-white shadow rounded-xl p-6"
          >

            <div className="flex flex-col md:flex-row md:justify-between gap-4">

              <div>
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

                <p>
                  <strong>Total:</strong> ₹ {order.totalPrice}
                </p>

                <p>
                  <strong>Status:</strong> {order.orderStatus}
                </p>
              </div>

              <div>
                <Link
                  to={`/orders/${order._id}`}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                >
                  View Details
                </Link>
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MyOrders;