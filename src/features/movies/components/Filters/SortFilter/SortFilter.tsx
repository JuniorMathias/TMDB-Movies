import type { FilterProps } from "../../FilterProps";

const SortFilter = ({ value, onChange }: FilterProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
    >
      <option value="popularity.desc">Most Popular</option>
      <option value="vote_average.desc">Best Rating</option>
      <option value="release_date.desc">Newest</option>
      <option value="release_date.asc">Oldest</option>
    </select>
  );
};

export default SortFilter;