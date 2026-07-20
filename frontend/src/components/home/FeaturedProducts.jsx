import { useEffect, useState } from "react";
import ProductCard from "../product/ProductCard";
import { getProducts } from "../../services/product.service";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <h2 className="text-3xl font-bold mb-8">

        Featured Products

      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
}

export default FeaturedProducts;