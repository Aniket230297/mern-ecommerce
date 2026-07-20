import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

import ProductGrid from "../components/product/ProductGrid";

import { getProducts } from "../services/product.service";

function Products() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const data = await getProducts();

        setProducts(data.products);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);

  return (
    <Layout>

      <div className="max-w-7xl mx-auto px-4 py-10">

        <h1 className="text-3xl font-bold mb-8">
          All Products
        </h1>

        {loading ? (

          <p>Loading...</p>

        ) : (

          <ProductGrid
            products={products}
          />

        )}

      </div>

    </Layout>
  );
}

export default Products;