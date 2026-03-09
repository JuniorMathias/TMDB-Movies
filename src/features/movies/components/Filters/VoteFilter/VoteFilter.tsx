import type { FilterProps } from "../../FilterProps";

const VoteFilter = ({ value, onChange }: FilterProps) => {
  return (
    <div>
      <p className="mb-2 font-semibold text-white">Min Rating</p>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
      >
        <option value="">All</option>
        <option value="5">5+</option>
        <option value="6">6+</option>
        <option value="7">7+</option>
        <option value="8">8+</option>
      </select>
    </div>
  );
};

export default VoteFilter;
