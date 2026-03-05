import { Link, NavLink } from "react-router-dom";
import { useGetGenresQuery } from "@/features/movies/api/moviesApi";
import { useState, useEffect, useRef } from "react";
import { regexCategory } from "@/shared/utils/formatString";

const Header = () => {
  const { data: genresData, isLoading } = useGetGenresQuery();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-yellow-500 font-semibold"
      : "text-white transition-colors duration-200";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4 ">
        
        <Link to="/" className="text-xl font-bold text-white"> TMDB Movies </Link>

        <nav className="flex items-center gap-6 relative">
          <NavLink to="/" className={getNavLinkClass}>
            Movies
          </NavLink>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center text-white hover:text-yellow-500 transition-colors duration-200 font-semibold"
            >
              Categories <span className="ml-1">&#9662;</span>
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
                {isLoading ? (
                  <div className="p-2 text-gray-700"></div>
                ) : (
                  genresData?.genres.map((genre) => (
                    <NavLink
                      key={genre.id}
                      to={`/genre/${regexCategory(genre.name)}`} 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {genre.name}
                    </NavLink>
                  ))
                )}
              </div>
            )}
          </div>

          <NavLink to="/favorites" className={getNavLinkClass}>
            Favorites
          </NavLink>

        </nav>
      </div>
      <div className="h-[3px] w-full bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700"></div>
    </header>
  );
};

export default Header;