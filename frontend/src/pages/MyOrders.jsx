import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getMyOrders } from "../services/order.service";

import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data.orders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <Loader />;

  if (orders.length === 0)
    return <EmptyState message="No orders found." />;

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

            <div className="flex justify-between flex-wrap gap-3">

              <div>

                <p className="font-semibold">
                  Order ID
                </p>

                <p>{order._id}</p>

              </div>

              <div>

                <p>Status</p>

                <span className="font-semibold">
                  {order.orderStatus}
                </span>

              </div>

              <div>

                <p>Total</p>

                <span>
                  ₹ {order.totalPrice}
                </span>

              </div>

            </div>

            <Link
              to={`/orders/${order._id}`}
              className="inline-block mt-5 bg-blue-600 text-white px-5 py-2 rounded"
            >
              View Details
            </Link>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MyOrders;