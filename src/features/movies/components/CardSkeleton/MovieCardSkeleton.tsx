const MovieCardSkeleton = () => {
  return (
    <div className="bg-primary rounded-2xl shadow-lg overflow-hidden flex flex-col animate-pulse">
      
      <div className="w-full h-80 bg-secondary"></div>

      <div className="px-5 py-4 flex flex-col flex-1 space-y-3">
        
        <div className="h-4 w-24 bg-primary rounded"></div>

        <div className="h-3 w-full bg-primary rounded"></div>
        <div className="h-3 w-full bg-primary rounded"></div>
        <div className="h-3 w-3/4 bg-primary rounded"></div>

        <div className="flex justify-between mt-4">
          <div className="flex flex-col space-y-2">
            <div className="h-3 w-16 bg-primary rounded"></div>
            <div className="h-5 w-10 bg-primary rounded"></div>
          </div>

          <div className="flex flex-col items-end space-y-2">
            <div className="h-3 w-16 bg-primary rounded"></div>
            <div className="h-3 w-20 bg-primary rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;