import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getProducts,
  deleteProduct,
} from "../../services/product.service";

import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      setProducts(data.products);

    } catch (error) {

      toast.error("Unable to fetch products");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {

      await deleteProduct(id);

      toast.success("Product deleted");

      fetchProducts();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Delete failed"
      );

    }
  };

  if (loading) return <Loader />;

  if (products.length === 0)
    return <EmptyState message="No products found." />;

  return (
    <div className="overflow-x-auto">

      <table className="w-full bg-white shadow rounded-lg">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4">Image</th>

            <th className="p-4">Name</th>

            <th className="p-4">Category</th>

            <th className="p-4">Price</th>

            <th className="p-4">Stock</th>

            <th className="p-4">Action</th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr
              key={product._id}
              className="border-t text-center"
            >

              <td className="p-3">

                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="h-16 w-16 object-cover rounded mx-auto"
                />

              </td>

              <td>{product.name}</td>

              <td>
                {product.category?.name || "N/A"}
              </td>

              <td>
                ₹ {product.price}
              </td>

              <td>
                {product.stock}
              </td>

              <td>

                <div className="flex justify-center gap-3">

                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(product._id)
                    }
                    className="bg-red-600 text-white px-3 py-1 rounded"
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

export default ProductTable;