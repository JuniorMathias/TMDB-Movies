import { useState } from "react";
import { getFavorites } from "@/shared/utils/getFavorites";
import {
  useGetGenresQuery,
  useGetMoviesQuery,
} from "@/features/movies/api/moviesApi";
import MovieCard from "@/features/movies/components/Cards/MovieCard/MovieCard";
import { MovieDetailModal } from "@/shared/ui/Modal/movieDetail";

const Favorites = () => {
  const [favoriteIds] = useState<number[]>(() => getFavorites());

  const { data } = useGetMoviesQuery({ page: 1 });
  const { data: genresData } = useGetGenresQuery();

  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const favoriteMovies =
    data?.results.filter((movie) => favoriteIds.includes(movie.id)) || [];

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl text-white font-bold mb-6">Favorite Movies</h1>

      {favoriteMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favoriteMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              genres={genresData?.genres || []}
              onOpenDetail={setSelectedMovieId}
              updatePage={true}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No favorites found.</p>
      )}

      <MovieDetailModal
        movieId={selectedMovieId}
        onClose={() => setSelectedMovieId(null)}
      />
    </div>
  );
};

export default Favorites;
