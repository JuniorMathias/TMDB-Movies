import { useParams } from "react-router-dom";
import { useGetGenresQuery, useGetMoviesQuery } from "@/features/movies/api/moviesApi";
import { regexCategory } from "@/shared/utils/formatString";

const CategorieMovie = () => {
  const { category } = useParams<{ category: string }>();
  const { data: genresData } = useGetGenresQuery();

  const genre = genresData?.genres.find((gen) => regexCategory(gen.name) === category);

  const { data: moviesData, isLoading } = useGetMoviesQuery({
    with_genres: genre?.id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!genre) return <p>Gênero não encontrado.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{genre.name}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {moviesData?.results.map((movie) => (
          <div key={movie.id} className="bg-white shadow rounded p-2">
            {movie.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorieMovie;