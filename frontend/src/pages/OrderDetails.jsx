import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getOrderById } from "../services/order.service";

import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id);
        setOrder(data.order);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <Loader />;

  if (!order) {
    return <EmptyState message="Order not found." />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-6">
        Order Details
      </h1>

      <div className="bg-white shadow rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-4">
          Products
        </h2>

        {order.orderItems.map((item) => (
          <div
            key={item.product}
            className="flex justify-between py-3 border-b"
          >
            <span>
              {item.name} × {item.quantity}
            </span>

            <span>
              ₹ {item.price * item.quantity}
            </span>
          </div>
        ))}

        <div className="mt-6 space-y-2">
          <p>
            <strong>Total:</strong> ₹ {order.totalPrice}
          </p>

          <p>
            <strong>Payment:</strong> {order.paymentMethod}
          </p>

          <p>
            <strong>Status:</strong> {order.orderStatus}
          </p>
        </div>

      </div>

    </div>
  );
}

export default OrderDetails;