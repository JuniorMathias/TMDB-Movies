import { useState, useMemo } from "react";
import { useGetMoviesQuery, useGetGenresQuery } from "@/features/movies/api/moviesApi";
import { formatDate } from "@/shared/utils/formatDate";
import { Pagination } from "@/shared/ui/Pagination/Pagination";
import { MovieDetailModal } from "@/shared/ui/Modal/movieDetail";

const MoviesTable = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [minVote, setMinVote] = useState("");
  const [year, setYear] = useState("");
  const [sort, setSort] = useState("popularity.desc");
   const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const { data } = useGetMoviesQuery({
    page: page,
    sort_by: sort,
    with_genres: selectedGenres.join(","),
    "vote_average.gte": minVote,
    primary_release_year: year,
  });

  const { data: genresData } = useGetGenresQuery();

  const filteredMovies = useMemo(() => {
    if (!data) return [];

    return data.results.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const toggleGenre = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  return (
    <div className="container mx-auto px-6 py-4 text-white">

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search movie..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 rounded bg-gray-800 border border-gray-600"
      />

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

        {/* GENRES */}
        <div>
          <p className="mb-2 font-semibold">Genres</p>
          <div className="flex flex-wrap gap-2">
            {genresData?.genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => toggleGenre(genre.id)}
                className={`px-3 py-1 rounded text-sm border ${
                  selectedGenres.includes(genre.id)
                    ? "bg-primary text-white"
                    : "border-gray-600"
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        {/* MIN VOTE */}
        <div>
          <p className="mb-2 font-semibold">Min Rating</p>
          <select
            value={minVote}
            onChange={(e) => setMinVote(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
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
          <p className="mb-2 font-semibold">Year</p>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="2024"
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
          />
        </div>
      </div>

      {/* SORT */}
      <div className="mb-4">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 bg-gray-800 border border-gray-600 rounded"
        >
          <option value="popularity.desc">Most Popular</option>
          <option value="vote_average.desc">Best Rating</option>
          <option value="release_date.desc">Newest</option>
        </select>
      </div>

      {/* TABLE */}
      <table className="w-full border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Release</th>
            <th className="p-2 text-left">Rating</th>
            <th className="p-2 text-left">Popularity</th>
            <th className="p-2 text-left"></th>
          </tr>
        </thead>

        <tbody>
          {filteredMovies.map((movie) => (
            <tr key={movie.id} className="border-t border-gray-700">
              <td className="p-2">{movie.title}</td>
              <td className="p-2">{formatDate(movie.release_date)}</td>
              <td className="p-2">{movie.vote_average.toFixed(1)}</td>
              <td className="p-2">{movie.popularity}</td>
              <td className="p-2">
                <button
                  className=" text-blue-400 hover:underline"
                  onClick={() => setSelectedMovieId(movie.id)}
                >
                  Ver mais
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination page={page} totalPages={data?.total_pages ?? 1} onPageChange={setPage} />
      <MovieDetailModal
        movieId={selectedMovieId}
        onClose={() => setSelectedMovieId(null)}
      />
    </div>
  );
};

export default MoviesTable;