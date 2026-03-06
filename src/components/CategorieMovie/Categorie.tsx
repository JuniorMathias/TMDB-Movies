import { useParams } from "react-router-dom";
import { useGetGenresQuery, useGetMoviesQuery } from "@/features/movies/api/moviesApi";
import { regexCategory } from "@/shared/utils/formatString";
import { useState } from "react";
import MovieCardSkeleton from "@/features/movies/components/Cards/CardSkeleton/MovieCardSkeleton";
import { Pagination } from "@/shared/ui/Pagination/Pagination";
import ErrorMessage from "@/shared/components/ErrorMessage/ErrorMessage";
import { MovieDetailModal } from "@/shared/ui/Modal/movieDetail";
import MovieCard from "@/features/movies/components/Cards/MovieCard/MovieCard";

const CategorieMovie = () => {
  const [page, setPage] = useState(1);
  const { data: genresData } = useGetGenresQuery();
  const { category } = useParams<{ category: string }>();
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const genre = genresData?.genres.find((gen) => regexCategory(gen.name) === category);

  const { data: data, error, isLoading } = useGetMoviesQuery({
    with_genres: genre?.id,
    page: page
  });

  if (error) return <ErrorMessage />;
  if (isLoading) return <MovieCardSkeleton />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl text-white italic mb-4 font-bold font-extrabold">
        {genre?.name}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data?.results.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            genres={genresData?.genres || []}
            onOpenDetail={setSelectedMovieId}
          />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={data?.total_pages ?? 1}
        onPageChange={setPage}
      />

      <MovieDetailModal
        movieId={selectedMovieId}
        onClose={() => setSelectedMovieId(null)}
      />
    </div>
  );
};

export default CategorieMovie;