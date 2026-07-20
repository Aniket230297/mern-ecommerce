import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AdminLayout from "../../components/layout/AdminLayout";
import CategoryForm from "../../components/admin/CategoryForm";

import { createCategory } from "../../services/category.service";

function AddCategory() {

  const navigate = useNavigate();

  const handleSubmit = async (data) => {

    try {

      await createCategory(data);

      toast.success("Category created");

      navigate("/admin/categories");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Unable to create category"
      );

    }

  };

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-8">
        Add Category
      </h1>

      <CategoryForm onSubmit={handleSubmit} />

    </AdminLayout>
  );
}

export default AddCategory;
