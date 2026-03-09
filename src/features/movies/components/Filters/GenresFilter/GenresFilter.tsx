import type { GenreProps } from "../../FilterProps";

const GenresFilter = ({
  genres,
  selectedGenres,
  onToggleGenre,
}: GenreProps) => {
  return (
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
  );
};

export default GenresFilter;
