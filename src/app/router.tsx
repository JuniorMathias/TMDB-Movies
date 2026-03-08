import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/app/layouts/MainLayout";
import MoviesPage from "@/pages/MoviesPage/MoviesPage";
import FavoritesPage from "@/pages/FavoritesPage/FavoritesPage";
import ErrorMessage from "@/shared/components/ErrorMessage/ErrorMessage";
import CategoriesPage from "@/pages/CategoriesPage/CategoriesPage";
import SearchPage from "@/pages/SearchPage/SearchPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorMessage />,
    children: [
      { index: true, element: <MoviesPage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "genre/:category", element: <CategoriesPage /> },
      { path: "search", element: <SearchPage /> },
    ],
  },
]);