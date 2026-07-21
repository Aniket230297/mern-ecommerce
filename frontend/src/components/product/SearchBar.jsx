function SearchBar({ keyword, setKeyword }) {
  return (
    <input
      type="text"
      placeholder="Search Products..."
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      className="w-full border rounded-lg p-3"
    />
  );
}

export default SearchBar;