import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AdminLayout from "../../components/layout/AdminLayout";

import { createProduct } from "../../services/product.service";
import { getCategories } from "../../services/category.service";

function AddProduct() {
  const navigate = useNavigate();

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
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        images: [form.images],
      };

      await createProduct(productData);

      toast.success("Product Added Successfully");

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

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-8 space-y-5"
      >

        <input
          name="name"
          placeholder="Product Name"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-3 rounded"
          rows="4"
          onChange={handleChange}
          required
        />

        <input
          name="brand"
          placeholder="Brand"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <select
          name="category"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        >
          <option value="">
            Select Category
          </option>

          {categories.map((cat) => (
            <option
              key={cat._id}
              value={cat._id}
            >
              {cat.name}
            </option>
          ))}

        </select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="images"
          placeholder="Image URL"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isFeatured"
            onChange={handleChange}
          />

          Featured Product
        </label>

        <button
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
        >
          Add Product
        </button>

      </form>

    </AdminLayout>
  );
}

export default AddProduct;