import { useEffect, useState } from "react";

import AdminLayout from "../../components/layout/AdminLayout";

import Loader from "../../components/common/Loader";

import StatCard from "../../components/admin/StatCard";

import { getDashboardStats } from "../../services/dashboard.service";

function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboardStats();

        setData(res);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <Loader />;

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Products" value={data.stats.totalProducts} />

        <StatCard title="Categories" value={data.stats.totalCategories} />

        <StatCard title="Orders" value={data.stats.totalOrders} />

        <StatCard title="Users" value={data.stats.totalUsers} />
      </div>

      {/* Recent Orders */}

      <div className="bg-white rounded-xl shadow mt-10">
        <h2 className="text-xl font-bold p-6">Recent Orders</h2>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4">Customer</th>

              <th>Total</th>

              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.recentOrders.map((order) => (
              <tr key={order._id} className="border-t text-center">
                <td className="p-4">{order.user?.name}</td>

                <td>₹ {order.totalPrice}</td>

                <td>{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl shadow mt-10">

    <h2 className="text-xl font-bold p-6">

        Latest Products

    </h2>

    <table className="w-full">

        <thead>

            <tr className="bg-gray-100">

                <th className="p-4">

                    Product

                </th>

                <th>

                    Price

                </th>

                <th>

                    Stock

                </th>

            </tr>

        </thead>

        <tbody>

            {data.recentProducts.map((product) => (

                <tr
                    key={product._id}
                    className="border-t text-center"
                >

                    <td className="p-4">

                        {product.name}

                    </td>

                    <td>

                        ₹ {product.price}

                    </td>

                    <td>

                        {product.stock}

                    </td>

                </tr>

            ))}

        </tbody>

    </table>

</div>
    </AdminLayout>
  );
}

export default Dashboard;
