import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/common/Loader";

import {
  getProductById,
  updateProduct,
} from "../../services/product.service";

import { getCategories } from "../../services/category.service";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    images: "",
    isFeatured: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          getProductById(id),
          getCategories(),
        ]);

        const product = productRes.product;

        setCategories(categoryRes.categories);

        setForm({
          name: product.name,
          description: product.description,
          brand: product.brand,
          category: product.category?._id || product.category,
          price: product.price,
          stock: product.stock,
          images: product.images[0],
          isFeatured: product.isFeatured,
        });
      } catch (error) {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProduct(id, {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        images: [form.images],
      });

      toast.success("Product Updated");

      navigate("/admin/products");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update Failed"
      );
    }
  };

  if (loading) return <Loader />;

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-8">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-8 space-y-5"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          className="w-full border p-3 rounded"
        />

        <input
          name="brand"
          value={form.brand}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="images"
          value={form.images}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isFeatured"
            checked={form.isFeatured}
            onChange={handleChange}
          />

          Featured Product
        </label>

        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg">
          Update Product
        </button>

      </form>

    </AdminLayout>
  );
}

export default EditProduct;