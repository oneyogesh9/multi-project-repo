import React from "react";

interface SearchFilterProps {
  q: string;
  category: string;
  categories: string[];
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  q,
  category,
  categories,
  onQueryChange,
  onCategoryChange,
}) => {
  return (
    <div className="filter-row">
      <input
        type="text"
        value={q}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search by name or description"
      />
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilter;
