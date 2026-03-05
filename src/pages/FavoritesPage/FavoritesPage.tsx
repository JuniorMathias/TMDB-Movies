import ErrorMessage from "@/shared/components/ErrorMessage/ErrorMessage";

const FavoritesPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Favoritos</h1>
      <p>Aqui vai a lista de filmes favoritos.</p>
      <ErrorMessage />
    </div>
  );
};

export default FavoritesPage;