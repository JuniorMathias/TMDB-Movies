
import SearchInput from "@/shared/ui/Search/SearchInput";
import type { MoviesFiltersProps } from "../../types";

const MoviesFilters = ({
  search,
  onSearchChange,
  genres,
  selectedGenres,
  onToggleGenre,
  minVote,
  onMinVoteChange,
  year,
  onYearChange,
  sort,
  onSortChange,
}: MoviesFiltersProps) => {
  return (
    <div className="flex flex-col gap-6 mb-6">

      {/* SEARCH */}
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Search movie..."
      />

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* GENRES */}
        <div>
          <p className="mb-2 font-semibold text-white">Genres</p>

          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => onToggleGenre(genre.id)}
                className={`px-3 py-1 rounded text-sm border ${
                  selectedGenres.includes(genre.id)
                    ? "bg-primary text-white"
                    : "border-gray-600 text-white"
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        {/* MIN VOTE */}
        <div>
          <p className="mb-2 font-semibold text-white">Min Rating</p>

          <select
            value={minVote}
            onChange={(e) => onMinVoteChange(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
          >
            <option value="">All</option>
            <option value="5">5+</option>
            <option value="6">6+</option>
            <option value="7">7+</option>
            <option value="8">8+</option>
          </select>
        </div>

        {/* YEAR */}
        <div>
          <p className="mb-2 font-semibold text-white">Year</p>

          <input
            type="number"
            value={year}
            onChange={(e) => onYearChange(e.target.value)}
            placeholder="2024"
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
          />
        </div>
      </div>

      {/* SORT */}
      <div>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
        >
          <option value="popularity.desc">Most Popular</option>
          <option value="vote_average.desc">Best Rating</option>
          <option value="release_date.desc">Newest</option>
        </select>
      </div>

    </div>
  );
};

export default MoviesFilters;