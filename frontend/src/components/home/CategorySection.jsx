
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Layers3 } from "lucide-react";
import { getCategories } from "../../services/category.service";

function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data?.categories ?? []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Section heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-[#4361EE]">
              <Layers3 size={16} />
              <span>Explore Collections</span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Shop by{" "}
              <span className="text-[#4361EE]">Category</span>
            </h2>

            <p className="mt-3 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
              Discover products you'll love, organized around what matters
              to you.
            </p>
          </div>

          {!loading && categories.length > 0 && (
            <Link
              to="/products"
              className="group inline-flex w-fit items-center gap-2 font-semibold text-[#4361EE] transition hover:text-[#3A56D4]"
            >
              View all products
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          )}
        </div>

        {/* Loading skeletons */}
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 sm:p-5"
              >
                <div className="aspect-[4/3] rounded-xl bg-slate-100" />
                <div className="mx-auto mt-5 h-4 w-2/3 rounded bg-slate-100" />
                <div className="mx-auto mt-3 h-3 w-1/3 rounded bg-slate-50" />
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          /* Empty state */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <Layers3 size={36} className="mx-auto text-slate-400" />
            <h3 className="mt-4 text-lg font-bold text-slate-800">
              No categories available
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Please check back later to explore our collections.
            </p>
          </div>
        ) : (
          /* Category cards */
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category._id}
                to="/products"
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#4361EE]/30 hover:shadow-xl hover:shadow-indigo-950/10 focus:outline-none focus:ring-2 focus:ring-[#4361EE] focus:ring-offset-2 sm:p-4"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
                  {category.image?.[0] ? (
                    <img
                      src={category.image[0]}
                      alt={category.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Layers3
                        size={36}
                        className="text-slate-300"
                      />
                    </div>
                  )}

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Arrow */}
                  <div className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-[#4361EE] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowRight size={17} />
                  </div>
                </div>

                {/* Category details */}
                <div className="flex items-center justify-between gap-2 px-1 pb-1 pt-4">
                  <h3 className="min-w-0 truncate text-sm font-bold text-slate-800 transition-colors duration-300 group-hover:text-[#4361EE] sm:text-base">
                    {category.name}
                  </h3>

                  <ArrowRight
                    size={16}
                    className="shrink-0 text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#4361EE]"
                  />
                </div>

                <p className="px-1 pb-2 text-xs text-slate-500 sm:text-sm">
                  Explore collection
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default CategorySection;
