import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import ProductTable from "../../components/admin/ProductTable";

function Products() {
  return (
    <AdminLayout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <Link
          to="/admin/products/add"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Add Product
        </Link>

      </div>

      <ProductTable />

    </AdminLayout>
  );
}

export default Products;