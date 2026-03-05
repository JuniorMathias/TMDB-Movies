import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/app/layouts/MainLayout";
import MoviesPage from "@/pages/MoviesPage/MoviesPage";
import FavoritesPage from "@/pages/FavoritesPage/FavoritesPage";
import ErrorMessage from "@/shared/components/ErrorMessage/ErrorMessage";
import MoviesTable from "@/components/MoviesTable/MoviesTable";
import CategoriesPage from "@/pages/CategoriesPage/CategoriesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorMessage />,
    children: [
      { index: true, element: <MoviesPage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "genre/:category", element: <CategoriesPage /> },
      { path: "search", element: <MoviesTable /> },
    ],
  },
]);