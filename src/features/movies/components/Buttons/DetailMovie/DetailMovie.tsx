interface DetailMovieProps {
  onClick: () => void;
}

const DetailMovie = ({ onClick }: DetailMovieProps) => {
  return (
    <button
      onClick={onClick}
      className="text-blue-400 hover:underline"
    >
      Ver mais
    </button>
  );
};

export default DetailMovie;