import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { MoviesResponse, Movie } from "../../../shared/types/types";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<MoviesResponse, Record<string, any>>({
      query: (params) => ({
        url: "discover/movie",
        params: {
          api_key: API_KEY,
          include_adult: false,
          include_video: false,
          language: "en-US",
          ...params,
        },
      }),
    }),

    getMovieDetail: builder.query<Movie, number>({
      query: (id) => ({
        url: `movie/${id}`,
        params: {
          api_key: API_KEY,
        },
      }),
    }),

    getGenres: builder.query<{ genres: { id: number; name: string }[] }, void>({
      query: () => ({
        url: "genre/movie/list",
        params: {
          api_key: API_KEY,
          language: "en-US",
        },
      }),
    }),

    getSearchMovies: builder.query<MoviesResponse, { query: string; page?: number }>({
      query: ({ query, page = 1 }) => ({
        url: "search/movie",
        params: {
          api_key: API_KEY,
          query,
          include_adult: false,
          language: "en-US",
          page,
        },
      }),
    }),
 
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieDetailQuery,
  useGetGenresQuery,
  useGetSearchMoviesQuery,
} = moviesApi;