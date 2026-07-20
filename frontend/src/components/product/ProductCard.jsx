import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={product.images?.[0]}
        alt={product.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold line-clamp-1">{product.name}</h2>

        <p className="text-gray-500 mt-2">₹ {product.price}</p>

        <p className="text-sm text-gray-600 mt-2">Stock : {product.stock}</p>

        <div className="mt-4 flex gap-2">
          <Link
            to={`/product/${product._id}`}
            className="flex-1 text-center bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900"
          >
            View Details
          </Link>

          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
