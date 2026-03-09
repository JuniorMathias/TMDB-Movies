import { Pagination } from "@/shared/ui/Pagination/Pagination";
import { MovieDetailModal } from "@/shared/ui/Modal/movieDetail";
import ErrorMessage from "@/shared/components/ErrorMessage/ErrorMessage";
import MovieCard from "@/features/movies/components/Cards/MovieCard/MovieCard";
import MovieCardSkeleton from "@/features/movies/components/Cards/CardSkeleton/MovieCardSkeleton";
import SearchFilter from "@/features/movies/components/Filters/Search/SearchInput";
import GenresFilter from "@/features/movies/components/Filters/GenresFilter/GenresFilter";
import SortFilter from "@/features/movies/components/Filters/SortFilter/SortFilter";
import VoteFilter from "@/features/movies/components/Filters/VoteFilter/VoteFilter";
import YearFilter from "@/features/movies/components/Filters/YearFilter/YearFilter";
import { useMoviesFilters } from "@/shared/hooks/useMoviesFilters";


const MoviesList = () => {
  const {
    page, setPage,
    selectedGenres,  toggleGenre,
    minVote, setMinVote,
    year, setYear,
    sort, setSort,
    searchValue, setSearchValue,
    selectedMovieId, setSelectedMovieId,
    genresData, moviesData,
    searchData, filteredMovies,
    error,  isLoading,
  } = useMoviesFilters();

  if (error) return <ErrorMessage />;
  if (isLoading) return <MovieCardSkeleton />;

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col gap-4 w-full md:w-1/4">
          <SearchFilter value={searchValue} onChange={setSearchValue} />
          <GenresFilter
            genres={genresData?.genres || []}
            selectedGenres={selectedGenres}
            onToggleGenre={toggleGenre}
          />
          <VoteFilter value={minVote} onChange={setMinVote} />
          <YearFilter value={year} onChange={setYear} />
          <SortFilter value={sort} onChange={setSort} />
        </div>

        <div className="flex-1 flex flex-col">
          <h1 className="text-2xl text-white mb-4 font-bold">
            Popular Movies
          </h1>

          {filteredMovies.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    genres={genresData?.genres || []}
                    onOpenDetail={setSelectedMovieId}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-center">
                <Pagination
                  page={page}
                  totalPages={
                    searchValue
                      ? searchData?.total_pages ?? 1
                      : moviesData?.total_pages ?? 1
                  }
                  onPageChange={setPage}
                />
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 mt-4">
              No movies found.
            </p>
          )}
        </div>
      </div>

      <MovieDetailModal
        movieId={selectedMovieId}
        onClose={() => setSelectedMovieId(null)}
      />
    </div>
  );
};

export default MoviesList;