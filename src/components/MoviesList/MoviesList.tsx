import { useMemo, useState } from "react";
import { useGetMoviesQuery, useGetGenresQuery } from "@/features/movies/api/moviesApi";
import { Pagination } from "@/shared/ui/Pagination/Pagination";
import { MovieDetailModal } from "@/shared/ui/Modal/movieDetail";
import ErrorMessage from "@/shared/components/ErrorMessage/ErrorMessage";
import MovieCard from "@/features/movies/components/Cards/MovieCard/MovieCard";
import MovieCardSkeleton from "@/features/movies/components/Cards/CardSkeleton/MovieCardSkeleton";
import SearchInput from "@/shared/ui/Search/SearchInput";

const MoviesList = () => {

  const [page, setPage] = useState(1);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const { data, error, isLoading } = useGetMoviesQuery({ page });
  const { data: genresData } = useGetGenresQuery();

   const filteredMovies = useMemo(() => {
    if (!data) return [];
    return data.results.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  if (error) return <ErrorMessage />;
  if (isLoading) return <MovieCardSkeleton />;

  return (
    <div className="container mx-auto px-6 py-8">
       <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search movie..."
      />
      
      <h1 className="text-2xl text-white mb-4 font-bold">
        Popular Movies
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            genres={genresData?.genres || []}
            onOpenDetail={setSelectedMovieId}
          />
        ))}
      </div>

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

export default MoviesList;