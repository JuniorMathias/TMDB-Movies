import { useGetMovieDetailQuery } from "@/features/movies/api/moviesApi";
import FavoriteButton from "@/features/movies/components/Buttons/FavoriteButton/FavoriteButton";
import MovieCardSkeleton from "@/features/movies/components/Cards/CardSkeleton/MovieCardSkeleton";
import ErrorMessage from "@/shared/components/ErrorMessage/ErrorMessage";
import { formatDate } from "@/shared/utils/formatDate";

interface MovieDetailModalProps {
  movieId: number | null;
  onClose: () => void;
}

export const MovieDetailModal = ({ movieId, onClose }: MovieDetailModalProps) => {

  if (!movieId) {
      document.body.style.overflow = "auto";
      return null;
    }else {  document.body.style.overflow = "hidden"; }

  const { data: movie, isLoading, error } = useGetMovieDetailQuery(movieId);

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 "
      onClick={onClose} 
    >
      <div
        className="bg-gray-900 text-white rounded-xl w-full max-w-4xl overflow-hidden shadow-[0_10px_25px_rgba(100,100,100,0.8)] flex flex-col md:flex-row relative max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-white hover:text-red-500 z-10"
          onClick={onClose}
        >  ✖  </button>
        <div className="w-full h-60 md:h-96 overflow-hidden rounded">
          {isLoading ? (
            <div className="bg-gray-700 animate-pulse w-full h-full"></div>
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w780${movie?.backdrop_path}`}
              alt={movie?.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="md:w-2/3 w-full p-6 overflow-y-auto flex flex-col gap-3">
          {isLoading && <ErrorMessage />}
          {error &&  <MovieCardSkeleton />}

          {movie && (
            <>
              <h2 className="text-2xl font-bold">{movie.title}</h2>

              <p className="mt-2">{movie.overview || "No description available."}</p>

              <div className="space-y-1 text-gray-400 text-sm">
                <p>
                  <strong>Genres:</strong> {movie.genres.map((g: { name: string }) => g.name).join(", ")}
                </p>
                <p>
                  <strong>Release Date:</strong> {formatDate(movie.release_date)}
                </p>
                <p>
                  <strong>Popularity:</strong> {movie.popularity}
                </p>
                <p>
                  <strong>Vote Average:</strong> {movie.vote_average.toFixed(1)}
                </p>
                <p>
                  <strong>Vote Count:</strong> {movie.vote_count}
                </p>
                <p>
                  <strong>Original Language:</strong> {movie.original_language.toUpperCase()}
                </p>
                <p>
                  <FavoriteButton movieId={movie.id} />
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};