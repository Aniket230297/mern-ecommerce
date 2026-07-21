
function ProductFilters({
  category,
  setCategory,
  categories,
  sort,
  setSort,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) {
  return (
    <div className="grid md:grid-cols-4 gap-4 my-6">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded-lg p-3"
      >
        <option value="">All Categories</option>

        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border rounded-lg p-3"
      >
        <option value="newest">Newest</option>
        <option value="price_asc">Price Low → High</option>
        <option value="price_desc">Price High → Low</option>
      </select>

      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="border rounded-lg p-3"
      />

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="border rounded-lg p-3"
      />
    </div>
  );
}

export default ProductFilters;