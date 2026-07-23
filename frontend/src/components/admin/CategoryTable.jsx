import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getCategories,
  deleteCategory,
} from "../../services/category.service";

import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";

function CategoryTable() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();

      setCategories(data.categories);
    } catch (error) {
      toast.error("Unable to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this category?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCategory(id);

      toast.success("Category deleted");

      fetchCategories();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  if (loading) return <Loader />;

  if (categories.length === 0)
    return (
      <EmptyState message="No categories found." />
    );

  return (
    <div className="overflow-x-auto">

      <table className="w-full bg-white rounded-lg shadow">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4">Image</th>

            <th className="p-4">Name</th>

            <th className="p-4">
              Description
            </th>

            <th className="p-4">
              Status
            </th>

            <th className="p-4">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {categories.map((category) => (

            <tr
              key={category._id}
              className="border-t text-center"
            >

              <td className="p-3">

                <img
                  src={category.image?.[0]}
                  alt={category.name}
                  className="h-14 w-14 object-cover rounded mx-auto"
                />

              </td>

              <td>{category.name}</td>

              <td>
                {category.description}
              </td>

              <td>

                {category.isActive ? (

                  <span className="text-green-600 font-semibold">
                    Active
                  </span>

                ) : (

                  <span className="text-red-600 font-semibold">
                    Inactive
                  </span>

                )}

              </td>

              <td>

                <div className="flex justify-center gap-2">

                  <Link
                    to={`/admin/categories/edit/${category._id}`}
                    className="bg-amber-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(category._id)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default CategoryTable;