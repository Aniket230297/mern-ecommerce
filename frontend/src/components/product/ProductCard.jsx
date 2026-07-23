import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-60 object-cover"
        />
      </Link>

      <div className="p-4">
        <h2 className="text-lg font-semibold line-clamp-1">{product.name}</h2>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-5">
          <span className="text-[#000] text-xl font-bold">
            ₹ {product.price}
          </span>

          <Link
            to={`/product/${product._id}`}
            className="px-5 py-2 border border-black rounded-lg bg-transparent text-black font-medium hover:bg-black hover:text-white transition-all duration-300"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
