import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

import SearchBar from "../components/product/SearchBar";
import ProductFilters from "../components/product/ProductFilters";
import ProductGrid from "../components/product/ProductGrid";
import { useSearchParams } from "react-router-dom";

import { getProducts } from "../services/product.service";
import { getCategories } from "../services/category.service";
import { aiProductSearch } from "../services/ai.service";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const [aiLoading, setAiLoading] = useState(false);

  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  // const keyword = searchParams.get("keyword") || "";
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [filterLoading, setFilterLoading] = useState(false);

  useEffect(() => {
    setKeyword(searchParams.get("keyword") || "");
  }, [searchParams]);

  const fetchData = async (firstLoad = false) => {
    try {
      if (firstLoad) {
        setLoading(true);
      } else {
        setFilterLoading(true);
      }

      const [productData, categoryData] = await Promise.all([
        getProducts({
          limit: "all",
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
    } catch {
      toast.error("Unable to load products.");
    } finally {
      setLoading(false);
      setFilterLoading(false);
    }
  };

  useEffect(() => {
    fetchData(loading);
  }, [keyword, category, sort, minPrice, maxPrice]);

  const handleAISearch = async (prompt) => {
    try {
      setAiLoading(true);

      const data = await aiProductSearch(prompt);
      const filters = data.filters;

      const searchText = prompt.toLowerCase();

      // Recognize mobile/phone searches
      const isSmartphoneSearch =
        /\b(mobiles?|smartphones?|cell phones?|phones?)\b/i.test(searchText);

      // Find the actual category from the loaded categories
      const smartphoneCategory = categories.find(
        (item) => item.name.toLowerCase() === "smartphones",
      );

      // Remove generic phone words from the keyword.
      // Keep a brand name such as Samsung if present.
      let keyword = filters.keyword || "";

      if (isSmartphoneSearch) {
        keyword = keyword
          .replace(/\b(smartphones?|mobiles?|cell phones?|phones?)\b/gi, "")
          .trim();

        setCategory(smartphoneCategory?._id || "");
      } else if (filters.category) {
        const matchedCategory = categories.find(
          (item) => item.name.toLowerCase() === filters.category.toLowerCase(),
        );

        setCategory(matchedCategory?._id || "");
      } else {
        setCategory("");
      }

      setKeyword(keyword);

      setMinPrice(filters.minPrice != null ? String(filters.minPrice) : "");

      setMaxPrice(filters.maxPrice != null ? String(filters.maxPrice) : "");

      setSort(filters.sort || "newest");

      toast.success("AI search applied!");
    } catch (error) {
      console.error("AI search error:", error);
      toast.error("AI search failed. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-8">All Products</h1>

        <SearchBar
          keyword={keyword}
          setKeyword={setKeyword}
          onAISearch={handleAISearch}
          aiLoading={aiLoading}
        />

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

        {filterLoading && (
          <p className="mb-4 text-sm text-gray-500">
            Updating product results...
          </p>
        )}

        {products.length === 0 && !filterLoading ? (
          <EmptyState message="No products found." />
        ) : products.length > 0 ? (
          <ProductGrid products={products} />
        ) : null}
      </div>
    </>
  );
}

export default Products;
