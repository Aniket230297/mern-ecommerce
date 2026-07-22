import { Link } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import CategoryTable from "../../components/admin/CategoryTable";
import { getCategories, deleteCategory } from "../../services/category.service";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data.categories);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Category?")) return;

    try {
      await deleteCategory(id);

      toast.success("Category Deleted");

      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <Loader />
      </AdminLayout>
    );
  }



  return (
    <AdminLayout>
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Categories</h1>

        <Link
          to="/admin/categories/add"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Add Category
        </Link>
      </div>

      <CategoryTable categories={categories} onDelete={handleDelete} />
    </AdminLayout>
  );
}

export default Categories;
