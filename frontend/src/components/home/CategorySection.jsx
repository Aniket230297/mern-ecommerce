import { useEffect, useState } from "react";
import { getCategories } from "../../services/category.service";

function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">
          Shop by Category
        </h2>

        <div className="flex justify-center items-center h-48">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 text-center"
          >
            <img
              src={category.image?.[0]}
              alt={category.name}
              className="w-24 h-24 object-cover mx-auto rounded-full"
            />

            <h3 className="mt-4 font-semibold">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;