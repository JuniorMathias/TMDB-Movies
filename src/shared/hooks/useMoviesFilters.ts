import { useMemo, useState } from "react";
import {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetSearchMoviesQuery,
} from "@/features/movies/api/moviesApi";

export const useMoviesFilters = () => {
  const [page, setPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [minVote, setMinVote] = useState("");
  const [year, setYear] = useState("");
  const [sort, setSort] = useState("popularity.desc");
  const [searchValue, setSearchValue] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const { data: genresData } = useGetGenresQuery();

  const toggleGenre = (id: number) =>
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );

  const { data: searchData } = useGetSearchMoviesQuery(
    searchValue ? { query: searchValue, page } : { query: "", page: 1 },
    { skip: !searchValue }
  );

  const {
    data: moviesData,
    error,
    isLoading,
  } = useGetMoviesQuery(
    !searchValue
      ? {
        page,
        sort_by: sort,
        with_genres: selectedGenres.join("|") || undefined,
        "vote_average.gte": minVote || undefined,
        primary_release_year: year || undefined,
      }
      : { page: 1 },
    { skip: !!searchValue }
  );

  const allMovies = useMemo(() => {
    if (searchValue) return searchData?.results || [];
    return moviesData?.results || [];
  }, [searchData, moviesData, searchValue]);

  const filteredMovies = useMemo(() => {
    return allMovies.filter((movie) => {
      const matchesGenre =
        selectedGenres.length === 0 ||
        movie.genre_ids?.some((id) => selectedGenres.includes(id));

      const matchesVote =
        !minVote || movie.vote_average >= Number(minVote);

      const matchesYear =
        !year || movie.release_date?.startsWith(year);

      return matchesGenre && matchesVote && matchesYear;
    });
  }, [allMovies, selectedGenres, minVote, year]);

  return {
    page,
    setPage,
    selectedGenres,
    toggleGenre,
    minVote,
    setMinVote,
    year,
    setYear,
    sort,
    setSort,
    searchValue,
    setSearchValue,
    selectedMovieId,
    setSelectedMovieId,
    genresData,
    moviesData,
    searchData,
    filteredMovies,
    isLoading,
    error
  };
};