import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/app/layouts/MainLayout";
import MoviesPage from "@/pages/MoviesPage/MoviesPage";
import MovieDetailPage from "@/pages/MovieDetailPage/MovieDetailPage";
import FavoritesPage from "@/pages/FavoritesPage/FavoritesPage";
import CategorieMovie from "@/components/CategorieMovie/Categorie"; // nova página
import ErrorMessage from "@/shared/components/ErrorMessage/ErrorMessage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorMessage />,
    children: [
      { index: true, element: <MoviesPage /> },
      { path: "movie/:id", element: <MovieDetailPage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "genre/:category", element: <CategorieMovie /> }
    ],
  },
]);