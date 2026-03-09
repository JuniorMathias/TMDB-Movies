interface DetailMovieProps {
  onClick?: () => void;
}

const DetailMovie = ({ onClick }: DetailMovieProps) => {
  return (
    <button onClick={onClick} className="text-blue-400 hover:underline">
      See More
    </button>
  );
};

export default DetailMovie;
