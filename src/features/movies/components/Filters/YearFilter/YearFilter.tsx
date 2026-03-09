import type { FilterProps } from "../../FilterProps";

const YearFilter = ({ value, onChange }: FilterProps) => {
  return (
    <div>
      <p className="mb-2 font-semibold text-white">Year</p>

      <input
        type="number"
        value={value}
        placeholder="Year"
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
      />
    </div>
  );
};

export default YearFilter;
