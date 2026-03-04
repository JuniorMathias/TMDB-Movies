import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold">Detalhes do Filme</h1>
      <p>ID do filme: {id}</p>
      <p>Aqui vai a imagem, descrição, etc.</p>
    </div>
  );
};

export default MovieDetailPage;