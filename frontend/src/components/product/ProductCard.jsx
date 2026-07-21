import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-60 object-cover"
        />
      </Link>

      <div className="p-4">
        <h2 className="text-lg font-semibold line-clamp-1">
          {product.name}
        </h2>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-5">
          <span className="text-blue-600 text-xl font-bold">
            ₹ {product.price}
          </span>

          <Link
            to={`/product/${product._id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;