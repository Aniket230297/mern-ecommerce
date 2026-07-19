import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductById } from "../services/product.service";

import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

import toast from "react-hot-toast";
import { addToCart } from "../services/cart.service";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);

        setProduct(data.product);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  
  const handleAddToCart = async () => {
  try {
    await addToCart(product._id, quantity);

    toast.success("Product added to cart");
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to add product"
    );
  }
};

  if (loading) return <Loader />;

  if (!product) return <EmptyState message="Product not found." />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-12">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full rounded-xl shadow"
        />

        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <p className="text-gray-500 mt-4">{product.description}</p>

          <h2 className="text-3xl font-bold text-blue-600 mt-6">
            ₹ {product.price}
          </h2>

          <p className="mt-4">Stock : {product.stock}</p>

          <div className="flex items-center gap-4 mt-8">
            <button
              className="px-4 py-2 border rounded"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              -
            </button>

            <span className="text-xl">{quantity}</span>

            <button
              className="px-4 py-2 border rounded"
              onClick={() =>
                quantity < product.stock && setQuantity(quantity + 1)
              }
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-8 w-full md:w-auto bg-blue-600 text-white px-10 py-3 rounded-lg hover:bg-blue-700"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
