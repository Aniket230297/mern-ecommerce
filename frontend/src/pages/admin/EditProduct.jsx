import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import AdminLayout from "../../components/layout/AdminLayout";
import ProductForm from "../../components/admin/ProductForm";
import Loader from "../../components/common/Loader";

import {
  getProductById,
  updateProduct,
} from "../../services/product.service";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data.product);
      } catch (error) {
        toast.error("Unable to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (updatedData) => {
    try {
      await updateProduct(id, updatedData);

      toast.success("Product updated successfully");

      navigate("/admin/products");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update product"
      );
    }
  };

  if (loading) return <Loader />;

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">
        Edit Product
      </h1>

      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
      />
    </AdminLayout>
  );
}

export default EditProduct;