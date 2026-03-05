import { useState } from "react";
import { useGetMoviesQuery, useGetGenresQuery } from "@/features/movies/api/moviesApi";
import { formatDate } from "@/shared/utils/formatDate";

const MoviesList = () => {
  const { data, error, isLoading } = useGetMoviesQuery({ page: 2 });
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { data: genresData } = useGetGenresQuery();

  const getGenreNames = (ids: number[]) => {
    return ids
      .map((id) => genresData?.genres.find((gen) => gen.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies</p>;

  const toggleReadMore = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 
        className="text-2xl rounded-3xl bg-yellow-400 text-primary italic mb-4 font-bold flex justify-center font-extrabold">
          Movies List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data?.results.map((movie) => {
          const isExpanded = expandedId === movie.id;

          return (
            <div
              className="rounded-3xl shadow-sm bg-primary overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300"
              key={movie.id}
            >
              <div className="relative w-full h-80 overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />

              </div>

              <div className="px-5 py-3 flex flex-col flex-1">
                <h3 className="text-white font-bold md:text-lg line-clamp-2">
                  {movie.title}
                </h3>

                <div className="flex flex-col mb-2 mt-2">
                  <span className="text-sm text-yellow-400">Genres</span>
                  <span className="text-sm text-white">{getGenreNames(movie.genre_ids)}</span>
                </div>


                <p
                  className={`leading-6 text-sm font-light text-gray-200 transition-all duration-300 ${isExpanded ? "" : "line-clamp-3"
                    }`}
                >
                  {movie.overview}
                </p>

                <div>


                </div>

                {movie.overview.length > 100 ?
                  <button
                    onClick={() => toggleReadMore(movie.id)}
                    className="text-secondary text-sm mt-2 hover:underline"
                  >
                    {isExpanded ? "Read less" : "Read more"}
                  </button> :
                  ""
                }

                <div className="flex justify-between mt-4 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-yellow-400 text-sm">Vote Average</span>
                    <span className="text-xl font-bold text-white">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-secondary font-semibold block">
                      {formatDate(movie.release_date)}
                    </span>
                  </div>
                </div>


              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoviesList;