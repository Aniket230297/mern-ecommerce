import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import ProductForm from "../../components/admin/ProductForm";
import AdminLayout from "../../components/layout/AdminLayout";

import { createProduct } from "../../services/product.service";

function AddProduct() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await createProduct(data);

      toast.success("Product created");

      navigate("/admin/products");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Unable to create product"
      );

    }
  };

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-8">
        Add Product
      </h1>

      <ProductForm onSubmit={handleSubmit} />

    </AdminLayout>
  );
}

export default AddProduct;