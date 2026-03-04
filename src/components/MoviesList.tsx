import { useGetMoviesQuery } from "@/features/movies/api/moviesApi";

const MoviesList = () => {
  // Chamada da query
  const { data, error, isLoading } = useGetMoviesQuery({ page: 1 });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies</p>;

  return (
    <div>
      {data?.results.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
          <p>{movie.release_date}</p>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;