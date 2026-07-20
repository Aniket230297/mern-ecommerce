import { Link } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import CategoryTable from "../../components/admin/CategoryTable";

function Categories() {
  return (
    <AdminLayout>

      <div className="flex justify-between mb-8">

        <h1 className="text-3xl font-bold">
          Categories
        </h1>

        <Link
          to="/admin/categories/add"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Add Category
        </Link>

      </div>

      <CategoryTable />

    </AdminLayout>
  );
}

export default Categories;