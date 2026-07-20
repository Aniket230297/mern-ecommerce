import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import AdminLayout from "../../components/layout/AdminLayout";
import CategoryForm from "../../components/admin/CategoryForm";
import Loader from "../../components/common/Loader";

import {
  getCategoryById,
  updateCategory,
} from "../../services/category.service";

function EditCategory() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [category, setCategory] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchCategory = async () => {

      try {

        const data = await getCategoryById(id);

        setCategory(data.category);

      } catch (error) {

        toast.error("Unable to load category");

      } finally {

        setLoading(false);

      }

    };

    fetchCategory();

  }, [id]);

  const handleSubmit = async (updatedData) => {

    try {

      await updateCategory(id, updatedData);

      toast.success("Category updated");

      navigate("/admin/categories");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Unable to update category"
      );

    }

  };

  if (loading) return <Loader />;

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-8">
        Edit Category
      </h1>

      <CategoryForm
        initialData={category}
        onSubmit={handleSubmit}
      />

    </AdminLayout>
  );
}

export default EditCategory;