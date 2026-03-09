import SearchFilter from "@/features/movies/components/Filters/Search/SearchInput";
import GenresFilter from "@/features/movies/components/Filters/GenresFilter/GenresFilter";
import VoteFilter from "@/features/movies/components/Filters/VoteFilter/VoteFilter";
import YearFilter from "@/features/movies/components/Filters/YearFilter/YearFilter";
import SortFilter from "@/features/movies/components/Filters/SortFilter/SortFilter";
import MoviesTable from "@/features/movies/components/Tables/MoviesTable/MoviesTable";
import { Pagination } from "@/shared/ui/Pagination/Pagination";
import { MovieDetailModal } from "@/shared/ui/Modal/movieDetail";
import { useMoviesFilters } from "@/shared/hooks/useMoviesFilters";
import MovieCardSkeleton from "@/features/movies/components/Cards/CardSkeleton/MovieCardSkeleton";
import ErrorMessage from "@/shared/components/ErrorMessage/ErrorMessage";


const MoviesFilters = () => {
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
    <div className="flex flex-col gap-6">
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

        <div className="flex flex-col w-full md:w-3/4 gap-4">
          {filteredMovies.length > 0 ? (
            <>
              <MoviesTable value={filteredMovies} onChange={setSelectedMovieId} />
              <Pagination
                page={page}
                totalPages={
                  searchValue
                    ? searchData?.total_pages ?? 1
                    : moviesData?.total_pages ?? 1
                }
                onPageChange={setPage}
              />
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

export default MoviesFilters;