import { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "@material-tailwind/react";

interface FavoriteButtonProps {
  movieId: number;
  updatePage?: boolean;
}

const FAVORITES_KEY = "favorite_movies";

const FavoriteButton = ({ movieId, updatePage }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const updateFavoriteState = () => {
      const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
      setIsFavorite(favorites.includes(movieId));
    };

    updateFavoriteState();

    window.addEventListener("favoritesUpdated", updateFavoriteState);

    return () => {
      window.removeEventListener("favoritesUpdated", updateFavoriteState);
    };
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

    window.dispatchEvent(new Event("favoritesUpdated"));

    if (updatePage) {
      window.location.reload();
    }
  };

  return (
    <Tooltip content={isFavorite ? "Remove Favorite" : "Add Favorite"} arrow>
      <button
        onClick={toggleFavorite}
        className={`transition transform hover:scale-110 ${isFavorite ? "text-red-500" : "text-gray-400"
          }`}
      >
        <HeartIcon className="h-6 w-6" />
      </button>
    </Tooltip>
  );
};

export default FavoriteButton;