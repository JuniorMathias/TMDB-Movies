import { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";

interface FavoriteButtonProps {
  movieId: number;
}

const FAVORITES_KEY = "favorite_movies";

const FavoriteButton = ({ movieId }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    setIsFavorite(favorites.includes(movieId));
  }, [movieId]);

  const toggleFavorite = () => {
    const favorites: number[] = JSON.parse(
      localStorage.getItem(FAVORITES_KEY) || "[]"
    );

    let updatedFavorites;

    if (favorites.includes(movieId)) {
      updatedFavorites = favorites.filter((id) => id !== movieId);
      setIsFavorite(false);
    } else {
      updatedFavorites = [...favorites, movieId];
      setIsFavorite(true);
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`transition transform hover:scale-110 ${
        isFavorite ? "text-red-500" : "text-gray-400"
      }`}
    >
      <HeartIcon className="h-6 w-6" />
    </button>
  );
};

export default FavoriteButton;