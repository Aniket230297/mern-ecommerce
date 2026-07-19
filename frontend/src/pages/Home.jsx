import { useEffect, useState } from "react";

import Hero from "../components/layout/Hero";
import ProductCard from "../components/product/ProductCard";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

import { getProducts } from "../services/product.service";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Hero />

      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold mb-10">
          Featured Products
        </h2>

        {loading ? (
          <Loader />
        ) : products.length === 0 ? (
          <EmptyState message="No products found." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Home;