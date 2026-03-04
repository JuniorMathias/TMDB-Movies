import { Link, NavLink } from "react-router-dom";

const Header = () => {

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-secondary font-semibold"
      : "text-white hover:text-yellow-500 transition-colors duration-200";

  return (
    <header className="bg-primary shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        
        <Link to="/" className="text-xl font-bold text-white">
          TMDB Movies
        </Link>

        <nav className="flex gap-6">
          <NavLink
            to="/"
            className={getNavLinkClass}
          >
            Movies
          </NavLink>

          <NavLink
            to="/favorites"
            className={getNavLinkClass}
          >
            Favorites
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;