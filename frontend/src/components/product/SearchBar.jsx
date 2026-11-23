import { useEffect, useState } from "react";
import { Sparkles, Search, LoaderCircle } from "lucide-react";

function SearchBar({ keyword, setKeyword, onAISearch, aiLoading = false }) {
  const [query, setQuery] = useState(keyword);

  useEffect(() => {
    setQuery(keyword);
  }, [keyword]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim() || aiLoading) return;

    onAISearch(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col gap-3 sm:flex-row"
    >
      <div className="relative flex-1">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Try: headphones under 3000..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setKeyword(e.target.value);
          }}
          disabled={aiLoading}
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-[#4361EE] focus:ring-2 focus:ring-[#4361EE]/20 disabled:opacity-70"
        />
      </div>

      <button
        type="submit"
        disabled={aiLoading || !query.trim()}
        className="flex items-center justify-center gap-2 rounded-xl bg-[#4361EE] px-5 py-3 font-semibold text-white transition hover:bg-[#3A56D4] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {aiLoading ? (
          <LoaderCircle size={19} className="animate-spin" />
        ) : (
          <Sparkles size={19} />
        )}

        {aiLoading ? "Understanding..." : "AI Search"}
      </button>
    </form>
  );
}

export default SearchBar;
