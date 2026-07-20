import { useState, useEffect } from "react";

function ProductForm({ initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    images: "",
  });

  useEffect(() => {
    setFormData({
      name: initialData.name || "",
      description: initialData.description || "",
      brand: initialData.brand || "",
      category:
        initialData.category?._id ||
        initialData.category ||
        "",
      price: initialData.price || "",
      stock: initialData.stock || "",
      images: initialData.images?.[0] || "",
    });
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      images: [formData.images],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        rows="4"
        required
      />

      <input
        name="brand"
        placeholder="Brand"
        value={formData.brand}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <input
        name="category"
        placeholder="Category ID"
        value={formData.category}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <input
        name="images"
        placeholder="Image URL"
        value={formData.images}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Save Product
      </button>

    </form>
  );
}

export default ProductForm;