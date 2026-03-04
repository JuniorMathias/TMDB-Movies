import { useState } from "react";
import { useGetMoviesQuery } from "@/features/movies/api/moviesApi";
import { formatDate } from "@/shared/utils/formatDate";

const MoviesList = () => {
  const { data, error, isLoading } = useGetMoviesQuery({ page: 2 });
  const [expandedId, setExpandedId] = useState<number | null>(null);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies</p>;

  const toggleReadMore = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl  text-yellow-400 mb-3 font-bold flex justify-center">Movies List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {data?.results.map((movie) => {
          const isExpanded = expandedId === movie.id;

          return (
            <div
              className="rounded-3xl shadow-sm bg-primary overflow-hidden flex flex-col"
              key={movie.id}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-70 object-cover"
              />

              <div className="px-5 py-3 flex flex-col flex-1">
                <h3 className="text-white font-bold md:text-lg line-clamp-2">
                  {movie.title}
                </h3>

                <span className="text-secondary pt-2 font-semibold block">
                  {formatDate(movie.release_date)}
                </span>

                <p
                  className={`leading-6 text-sm font-light text-gray-200 transition-all duration-300 ${isExpanded ? "" : "line-clamp-3"
                    }`}
                >
                  {movie.overview}
                </p>

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
                    <span className="text-sm text-white/60">Genres</span>
                    <span className="text-sm text-white">{movie.genre_ids.join(", ")}</span>
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