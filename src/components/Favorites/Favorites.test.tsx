import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Favorites from "./Favorites";
import { ThemeProvider } from "@material-tailwind/react";

// --- Mock the RTK Query hooks used inside Favorites ---
// We simulate API responses so the component can render without making real network calls
jest.mock("@/features/movies/api/moviesApi", () => ({
  useGetMoviesQuery: jest.fn(() => ({
    data: {
      results: [
        { id: 1, title: "Movie 1", genre_ids: [1], release_date: "2023-01-01", vote_average: 8 },
        { id: 2, title: "Movie 2", genre_ids: [2], release_date: "2023-02-01", vote_average: 7 },
      ],
    },
    isLoading: false,
    error: null,
  })),
  useGetGenresQuery: jest.fn(() => ({
    data: { genres: [{ id: 1, name: "Action" }, { id: 2, name: "Comedy" }] },
    isLoading: false,
    error: null,
  })),
}));

// --- Mock getFavorites utility ---
// We return only Movie 1 as favorite to test filtering behavior
jest.mock("@/shared/utils/getFavorites", () => ({
  getFavorites: jest.fn(() => [1]),
}));

// --- Mock the MovieDetailModal component ---
// We replace it with a simple div to avoid testing its internal hooks and queries
jest.mock("@/shared/ui/Modal/movieDetail", () => ({
  MovieDetailModal: () => <div data-testid="movie-detail-modal" />,
}));

// --- Minimal fake Redux store ---
// Favorites component requires a Redux provider, but we don't need real reducers for this test
const store = configureStore({
  reducer: {},
});

describe("Favorites Component", () => {
  it("renders favorite movies correctly", () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Favorites />
        </ThemeProvider>
      </Provider>
    );

    // Check if the main title is displayed
    expect(screen.getByText("Favorite Movies")).toBeInTheDocument();

    // Check that Movie 1 (favorite) is rendered
    expect(screen.getByText("Movie 1")).toBeInTheDocument();

    // Check that Movie 2 (not favorite) is NOT rendered
    expect(screen.queryByText("Movie 2")).not.toBeInTheDocument();
  });
});