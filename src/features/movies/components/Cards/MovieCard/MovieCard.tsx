import { StarIcon } from "@heroicons/react/24/solid";
import FavoriteButton from "../../Buttons/FavoriteButton/FavoriteButton";
import DetailMovie from "../../Buttons/DetailMovie/DetailMovie";
import type {  GenresResponse } from "@/features/movies/types";

const MovieCard = ({ movie, genres, onOpenDetail }: GenresResponse) => {

  const getGenreNames = (ids: number[]) =>
    ids
      .map((id) => genres.find((g) => g.id === id)?.name)
      .filter(Boolean)
      .join(", ");

  return (
    <div className="w-full bg-gray-900 text-white rounded-xl overflow-hidden border border-white/30 shadow-md
      transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className="h-80 w-full object-cover"
      />

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold line-clamp-2">
          {movie.title}
        </h3>

        <div className="flex flex-col mb-2 mt-2">
          <span className="text-sm text-primary">Genres</span>
          <span className="text-sm text-white">
            {getGenreNames(movie.genre_ids)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-yellow-400">
            <StarIcon className="h-5 w-5" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>

          <FavoriteButton movieId={movie.id} />
        </div>

        <DetailMovie onClick={() => onOpenDetail(movie.id)} />
      </div>
    </div>
  );
};

export default MovieCard;