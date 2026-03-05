const FAVORITES_KEY = "favorite_movies";

export const getFavorites = (): number[] => {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
};