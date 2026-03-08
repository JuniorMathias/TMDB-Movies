type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const SearchInput = ({ value, onChange, placeholder }: Props) => {
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

export default SearchInput;