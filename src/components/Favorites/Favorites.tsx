import { useEffect, useState } from "react";
import { getFavorites } from "@/shared/utils/getFavorites";
import { useGetMoviesQuery } from "@/features/movies/api/moviesApi";

const Favorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const { data } = useGetMoviesQuery({ page: 1 });

  useEffect(() => {
    setFavoriteIds(getFavorites());
  }, []);

  const favoriteMovies = data?.results.filter((movie) =>
    favoriteIds.includes(movie.id)
  );

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl text-white font-bold mb-6">
        Favorite Movies
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {favoriteMovies?.map((movie) => (
          <div key={movie.id} className="bg-gray-900 p-4 rounded-xl text-white">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="h-72 w-full object-cover rounded"
            />

            <h3 className="mt-2 font-semibold">{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;