import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Layout from "../components/layout/Layout";

import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

import SearchBar from "../components/product/SearchBar";
import ProductFilters from "../components/product/ProductFilters";
import ProductGrid from "../components/product/ProductGrid";
import { useSearchParams } from "react-router-dom";

import { getProducts } from "../services/product.service";
import { getCategories } from "../services/category.service";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const [keyword, setKeyword] = useState(
    searchParams.get("keyword") || ""
  );;
  // const keyword = searchParams.get("keyword") || "";
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
  setKeyword(searchParams.get("keyword") || "");
}, [searchParams]);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [productData, categoryData] = await Promise.all([
          getProducts({
            keyword,
            category,
            sort,
            minPrice,
            maxPrice,
          }),
          getCategories(),
        ]);

        setProducts(productData.products);
        setCategories(categoryData.categories);
      } catch (error) {
        toast.error("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword, category, sort, minPrice, maxPrice]);

  if (loading) return <Loader />;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-8">All Products</h1>

        <SearchBar keyword={keyword} setKeyword={setKeyword} />

        <ProductFilters
          category={category}
          setCategory={setCategory}
          categories={categories}
          sort={sort}
          setSort={setSort}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />

        {products.length === 0 ? (
          <EmptyState message="No products found." />
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </Layout>
  );
}

export default Products;
