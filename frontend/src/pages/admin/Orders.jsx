
import AdminLayout from "../../components/layout/AdminLayout";
import OrderTable from "../../components/admin/OrderTable";

function Orders() {
  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-8">
        Orders
      </h1>

      <OrderTable />

    </AdminLayout>
  );
}

export default Orders;