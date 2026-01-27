function SortSelector({ sortBy, setSortBy }) {
  return (
    <div className="controls">
      <label htmlFor="sort-by">Sort By: </label>
      <select
        value={sortBy}
        id="sort-by"
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="market_cap_desc">Market Cap (High To Low)</option>
        <option value="market_cap_asc">Market Cap (Low To High)</option>
        <option value="price_desc">Price (High To Low)</option>
        <option value="price_asc">Price (Low To High)</option>
        <option value="change_desc">24hr Change (High To Low)</option>
        <option value="change_asc">24hr Change (Low To High)</option>
      </select>
    </div>
  );
}

export default SortSelector;
