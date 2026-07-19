
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`}>
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

      <img
        src={product.images?.[0]}
        alt={product.name}
        className="h-60 w-full object-cover"
      />

      <div className="p-4">

        <h2 className="font-semibold text-lg">
          {product.name}
        </h2>

        <p className="text-blue-600 text-xl font-bold mt-2">
          ₹ {product.price}
        </p>

        <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-blue-700">
          <ShoppingCart size={18} />
          Add to Cart
        </button>

      </div>

    </div>
    </Link>
  );
}

export default ProductCard;