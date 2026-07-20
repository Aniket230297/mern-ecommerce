import { useState, useEffect } from "react";

function CategoryForm({ initialData = {}, onSubmit }) {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    isActive: true,
  });

  useEffect(() => {
    setFormData({
      name: initialData.name || "",
      description: initialData.description || "",
      image: initialData.image?.[0] || "",
      isActive:
        initialData.isActive ?? true,
    });
  }, [initialData]);

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit({
      ...formData,
      image: [formData.image],
    });

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Category Name"
        className="w-full border p-3 rounded"
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows="4"
        placeholder="Description"
        className="w-full border p-3 rounded"
      />

      <input
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full border p-3 rounded"
      />

      <label className="flex items-center gap-3">

        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
        />

        Active

      </label>

      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Save Category
      </button>

    </form>
  );
}

export default CategoryForm;