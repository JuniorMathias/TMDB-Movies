import { formatDate } from "@/shared/utils/formatDate";
import FavoriteButton from "@/features/movies/components/Buttons/FavoriteButton/FavoriteButton";
import DetailMovie from "@/features/movies/components/Buttons/DetailMovie/DetailMovie";

type Props = {
  movies: any[];
  onDetail: (id: number) => void;
};

const MoviesTable = ({ movies, onDetail }: Props) => {
  return (
    <table className="w-full border border-gray-700">
      <thead className="bg-gray-800">
        <tr>
          <th className="p-2 text-left">Title</th>
          <th className="p-2 text-left"></th>
          <th className="p-2 text-left">Release</th>
          <th className="p-2 text-left">Rating</th>
          <th className="p-2 text-left">Popularity</th>
          <th className="p-2 text-left"></th>
        </tr>
      </thead>

      <tbody>
        {movies.map((movie) => (
          <tr key={movie.id} className="border-t border-gray-700">
            <td className="p-2">{movie.title}</td>
            <td className="p-2">
              <FavoriteButton movieId={movie.id} />
            </td>
            <td className="p-2">{formatDate(movie.release_date)}</td>
            <td className="p-2">{movie.vote_average.toFixed(1)}</td>
            <td className="p-2">{movie.popularity}</td>
            <td className="p-2">
              <DetailMovie onClick={() => onDetail(movie.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;