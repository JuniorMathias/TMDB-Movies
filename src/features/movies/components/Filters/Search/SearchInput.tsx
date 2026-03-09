import type { SearchProps } from "../../FilterProps";

const SearchFilter = ({ value, onChange, placeholder }: SearchProps) => {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder || "Search..."}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mb-4 p-2 rounded bg-gray-800 border border-gray-600 text-white"
    />
  );
};

export default SearchFilter;
