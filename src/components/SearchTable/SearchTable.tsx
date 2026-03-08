import { useState, useMemo } from "react";
import { useGetGenresQuery, useGetMoviesQuery } from "@/features/movies/api/moviesApi";
import MoviesTable from "@/features/movies/components/Tables/MoviesTable/MoviesTable";
import { Pagination } from "@/shared/ui/Pagination/Pagination";
import { MovieDetailModal } from "@/shared/ui/Modal/movieDetail";
import MoviesFilters from "@/features/movies/components/Filters/MovieFilters";

const SearchTable = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const { data: genresData } = useGetGenresQuery();
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [minVote, setMinVote] = useState("");
  const [year, setYear] = useState("");
  const [sort, setSort] = useState("popularity.desc");

  const { data } = useGetMoviesQuery({
    page,
    sort_by: sort,
    with_genres: selectedGenres.join(","),
    "vote_average.gte": minVote,
    primary_release_year: year,
  });

  const toggleGenre = (id: number) => {
  setSelectedGenres((prev) =>
    prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
  );
};

  const filteredMovies = useMemo(() => {
    if (!data) return [];

    return data.results.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  return (
    <div className="container mx-auto px-6 py-4 text-white">

      <MoviesFilters
        search={search}
        onSearchChange={setSearch}
        genres={genresData?.genres || []}
        selectedGenres={selectedGenres}
        onToggleGenre={toggleGenre}
        minVote={minVote}
        onMinVoteChange={setMinVote}
        year={year}
        onYearChange={setYear}
        sort={sort}
        onSortChange={setSort}
      />

      <MoviesTable
        movies={filteredMovies}
        onDetail={(id) => setSelectedMovieId(id)}
      />

      <Pagination
        page={page}
        totalPages={data?.total_pages ?? 1}
        onPageChange={setPage}
      />

      <MovieDetailModal
        movieId={selectedMovieId}
        onClose={() => setSelectedMovieId(null)}
      />
    </div>
  );
};

export default SearchTable;