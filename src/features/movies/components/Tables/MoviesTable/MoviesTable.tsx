import { formatDate } from "@/shared/utils/formatDate";
import FavoriteButton from "@/features/movies/components/Buttons/FavoriteButton/FavoriteButton";
import type { TableProps } from "../../FilterProps";

const MoviesTable = ({ value, onChange }: TableProps) => {
  return (
    <table className="w-full table-fixed border border-gray-700 text-white">
      <thead className="bg-gray-800">
        <tr>
          <th className="p-2 text-left w-24 ">Title</th>
          <th className="p-2 text-left w-6"></th>
          <th className="p-2 text-left w-12">Release</th>
          <th className="p-2 text-left w-12">Rating</th>
          <th className=" text-left w-16">Popularity</th>
        </tr>
      </thead>

      <tbody>
        {value.map((movie) => (
          <tr key={movie.id} className="border-t border-gray-700">
            <td className="p-2 cursor-pointer hover:underline hover:text-primary" 
              onClick={() => onChange(movie.id)}>{movie.title}</td>
            <td className="p-2">
              <FavoriteButton movieId={movie.id} />
            </td>
            <td className="p-2">{formatDate(movie.release_date)}</td>
            <td className="p-2">{movie.vote_average.toFixed(1)}</td>
            <td className="p-2">{movie.popularity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;