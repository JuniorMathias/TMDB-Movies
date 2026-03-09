import { StarIcon } from "@heroicons/react/24/solid";
import FavoriteButton from "../../Buttons/FavoriteButton/FavoriteButton";
import type { GenresResponse } from "@/shared/types/types";

const MovieCard = ({
  movie,
  genres,
  onOpenDetail,
  updatePage,
}: GenresResponse) => {
  const getGenreNames = (ids: number[]) =>
    ids
      .map((id) => genres.find((g) => g.id === id)?.name)
      .filter(Boolean)
      .join(", ");

  return (
    <div
      className="w-full bg-gray-900 text-white rounded-xl overflow-hidden border border-white/30 shadow-md
      transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="h-80 w-full object-cover cursor-pointer"
          onClick={() => onOpenDetail(movie.id)}
        />

        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 px-2 py-1 rounded-md">
          <StarIcon className="h-5 w-5 text-primary" />
          <span className="text-sm text-white">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col">
        <h3 className="text-lg font-semibold line-clamp-2">{movie.title}</h3>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center  text-sm text-white">
            {getGenreNames(movie.genre_ids)}
          </div>{" "}
          <FavoriteButton movieId={movie.id} updatePage={updatePage} />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
