
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PackageSearch } from "lucide-react";
import ProductCard from "../product/ProductCard";
import { getProducts } from "../../services/product.service";

const PAGE_SIZE = 8;

function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm animate-pulse">
      <div className="aspect-square rounded-xl bg-slate-100" />
      <div className="mt-4 h-4 w-3/4 rounded bg-slate-100" />
      <div className="mt-3 h-3 w-full rounded bg-slate-100" />
      <div className="mt-2 h-3 w-1/2 rounded bg-slate-100" />
      <div className="mt-5 h-10 rounded-lg bg-slate-100" />
    </div>
  );
}

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(async (pageNumber, append = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const data = await getProducts({
        page: pageNumber,
        limit: PAGE_SIZE,
      });

      const fetchedProducts = data?.products ?? [];

      setProducts((previous) =>
        append
          ? [
              ...previous,
              ...fetchedProducts.filter(
                (product) =>
                  !previous.some((item) => item._id === product._id)
              ),
            ]
          : fetchedProducts
      );

      const pages =
        data?.pagination?.totalPages ??
        data?.totalPages ??
        1;

      setTotalPages(Number(pages) || 1);
      setPage(pageNumber);
    } catch (err) {
      console.error("Failed to fetch featured products:", err);
      setError("We couldn't load the products. Please try again.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  const handleLoadMore = () => {
    if (!loadingMore && page < totalPages) {
      fetchProducts(page + 1, true);
    }
  };

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section heading */}
        <div className="mb-9 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-[#4361EE]">
              Handpicked for you
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Featured{" "}
              <span className="text-[#4361EE]">Products</span>
            </h2>

            <p className="mt-3 max-w-xl text-base leading-7 text-slate-500">
              Explore our popular picks and find something you'll love.
            </p>
          </div>

          <Link
            to="/products"
            className="group inline-flex w-fit items-center gap-2 font-semibold text-[#4361EE] transition hover:text-[#3A56D4]"
          >
            View all products
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Error state */}
        {error && (
          <div
            role="alert"
            className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <p>{error}</p>
            <button
              type="button"
              onClick={() => fetchProducts(page)}
              className="font-semibold underline underline-offset-4"
            >
              Try again
            </button>
          </div>
        )}

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {loading
            ? Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            : products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}

          {/* Skeletons for additional pages */}
          {loadingMore &&
            Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <ProductSkeleton key={`more-${index}`} />
            ))}
        </div>

        {/* Empty state */}
        {!loading && !error && products.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <PackageSearch
              size={40}
              className="mx-auto text-slate-400"
            />
            <h3 className="mt-4 text-lg font-bold text-slate-800">
              No products available yet
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Please check back soon for new arrivals.
            </p>
          </div>
        )}

        {/* Load more */}
        {!loading && !error && products.length > 0 && page < totalPages && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="inline-flex min-w-48 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-800 shadow-sm transition hover:border-[#4361EE] hover:text-[#4361EE] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingMore ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#4361EE] border-t-transparent" />
                  Loading products...
                </>
              ) : (
                <>
                  Load More Products
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
