import { useState } from "react";
import { useGetMoviesQuery, useGetGenresQuery } from "@/features/movies/api/moviesApi";
import MovieCardSkeleton from "@/features/movies/components/CardSkeleton/MovieCardSkeleton";
import { Pagination } from "@/shared/ui/Pagination/Pagination";
import { HeartIcon, StarIcon } from "@heroicons/react/24/solid";
import { MovieDetailModal } from "@/shared/ui/Modal/movieDetail";
import ErrorMessage from "@/shared/components/ErrorMessage/ErrorMessage";

const MoviesList = () => {
  const [page, setPage] = useState(1);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const { data, error, isLoading } = useGetMoviesQuery({ page });
  const { data: genresData } = useGetGenresQuery();

  const getGenreNames = (ids: number[]) =>
    ids
      .map((id) => genresData?.genres.find((gen) => gen.id === id)?.name)
      .filter(Boolean)
      .join(", ");

  if (error) return <ErrorMessage />;
  if (isLoading) return <MovieCardSkeleton />;

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl text-white italic mb-4 font-bold font-extrabold">
        Popular Movies
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data?.results.map((movie) => (
          <div
            key={movie.id}
            className="w-full bg-gray-900 text-white rounded-xl overflow-hidden border border-white/30 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="h-80 w-full object-cover"
            />

            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold line-clamp-2">{movie.title}</h3>

              <div className="flex flex-col mb-2 mt-2">
                <span className="text-sm text-primary">Genres</span>
                <span className="text-sm text-white">{getGenreNames(movie.genre_ids)}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow-400">
                  <StarIcon className="h-5 w-5" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>

                <button className="text-red-500 hover:scale-110 transition">
                  <HeartIcon className="h-5 w-5" />
                </button>
              </div>

              <button
                className=" text-blue-400 hover:underline"
                onClick={() => setSelectedMovieId(movie.id)}
              >
                Ver mais
              </button>
            </div>
          </div>
        ))}
      </div>

      <Pagination page={page} totalPages={data?.total_pages ?? 1} onPageChange={setPage} />

      <MovieDetailModal
        movieId={selectedMovieId}
        onClose={() => setSelectedMovieId(null)}
      />
     
    </div>
  );
};

export default MoviesList;